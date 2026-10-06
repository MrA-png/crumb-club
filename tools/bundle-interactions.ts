import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
/** Small build-time CommonJS bundler for first-party TypeScript only. Runtime needs no CDN. */
export function bundleInteractions(root: string) {
  const modules = new Map<string, string>();
  function add(file: string): string {
    const id = path.relative(root, file).replaceAll('\\', '/');
    if (modules.has(id)) return id;
    modules.set(id, '');
    const source = fs.readFileSync(file, 'utf8');
    let code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    code = code.replace(/require\(["']([^"']+)["']\)/g, (_match, request: string) => {
      if (!request.startsWith('.')) throw new Error(`Unexpected browser dependency: ${request}`);
      let target = path.resolve(path.dirname(file), request);
      if (fs.existsSync(`${target}.ts`)) target += '.ts';
      else target = path.join(target, 'index.ts');
      return `require(${JSON.stringify(add(target))})`;
    });
    modules.set(id, code);
    return id;
  }
  const entry = add(path.join(root, 'lib/interactions/index.ts'));
  return `(()=>{const modules={${[...modules].map(([id, code]) => `${JSON.stringify(id)}:(module,exports,require)=>{\n${code}\n}`).join(',\n')}};const cache={};function require(id){if(cache[id])return cache[id].exports;const m=cache[id]={exports:{}};modules[id](m,m.exports,require);return m.exports;}window.CrumbPreview=require(${JSON.stringify(entry)});})();`;
}
