import type { Mood } from '@/lib/content';

/** Original layered vector art. CSS custom properties steer the eyes, head and wings. */
export function Mascot({ mood = 'normal', className = '', compact = false, label }: {
  mood?: Mood; className?: string; compact?: boolean; label?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={compact ? '108 45 330 330' : '0 0 560 610'}
      className={`mascot-art mood-${mood} ${className}`} fill="none" role={label ? 'img' : undefined}
      aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <g stroke="#20221f" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse className="bird-shadow" cx="285" cy="565" rx="176" ry="17" fill="#20221f" stroke="none" opacity=".13" />
        <g className="bird-body">
          {/* Tail feathers and a pair of gloriously oversized street shoes. */}
          <path d="m373 367 104 39-29 21 25 26-77 13-51-39" fill="#737e71" />
          <path d="m392 396 42 15m-50 2 35 18" strokeWidth="5" />
          <g className="bird-feet">
            <path d="m216 483-13 52 31 2 24-49m60-4 17 44 31-8-17-47" fill="#f2a16f" />
            <path d="M205 522c-16 0-22 13-50 19-20 4-32 8-32 22 0 15 27 19 61 18l64-5c16-1 17-14 13-28l-8-20c-17 11-33 8-48-6Z" fill="#f7f2e7" />
            <path d="m129 557 42 8 84-10m-64-24 12 15m5-21 13 15m5-16 12 15" strokeWidth="5" />
            <path d="M337 515c13-3 27-11 37-9 8 17 24 16 43 22 30 9 32 31 17 37-19 8-69 1-89-6-15-5-22-12-20-21Z" fill="#d6f56a" />
            <path d="m330 543 53 13 54-2m-73-40-7 15m23-10-9 14m27-9-9 12" strokeWidth="5" />
          </g>
          <path d="M191 269c-23 31-52 78-55 131-5 85 67 127 149 119 82-7 128-54 118-119-6-44-43-102-69-129Z" fill="#7e877b" />
          <path d="M237 308c-28 32-52 70-49 114 2 50 44 78 89 74 67-5 89-41 72-90-11-33-46-68-60-97Z" fill="#d5d6c7" stroke="none" />
          <path d="M174 305c41 37 110 58 169 20l-11-56-145-18Z" fill="#476149" />
          <path d="m187 302 14 9m10 7 14 5m16 6 14 1m17 0 13-2m14-3 12-5" stroke="#d6f56a" strokeWidth="4" />
          <g className="bird-wing-left">
            <path d="M180 342c-42 2-64 17-78 50-10 24-23 32-30 31-9-1-10-13-4-22-31 21-45 3-31-13-29 8-38-11-18-23 28-17 52-30 57-57 8-39 35-49 67-35" fill="#9ca492" />
            <path d="m94 361-20 24m36-12-23 26" strokeWidth="4.5" />
          </g>
          <path d="M360 327c45 12 58 49 41 94-15 39-48 61-65 43-10-11 5-22 19-37-27 19-43 7-31-8 12-15 24-32 25-55" fill="#737e71" />
          <path d="m363 378-14 34" strokeWidth="4.5" />
          {/* A very serious crumb delivery. */}
          <g className="bird-crumb">
            <path d="m43 298 11-34 48-14 33 27-6 42-33 16-34-9Z" fill="#f2bb72" />
            <path d="m59 299 12-20 24-9 22 17-10 28-24 3Z" fill="#f7dc9c" stroke="none" />
            <path d="m82 287 2 1m17 14h1m-29 5h1" stroke="#b8763b" strokeWidth="5" />
          </g>
          {/* Head is separate to let the character track the visitor. */}
          <g className="bird-head">
            <path d="M177 114c-7-19-7-39 8-45l29 21c-2-28 9-50 26-39l21 32c17-19 35-16 32 6 57 4 101 39 111 104 10 67-28 116-93 131-75 17-143-22-161-80-14-46-3-95 27-130Z" fill="#bcc2b1" />
            <path d="M198 126c-26 30-33 81-11 119" stroke="#e5e6d8" strokeWidth="12" />
            <path d="M186 286c42 41 108 48 159 9" strokeWidth="5" />
            <g className="bird-eyes">
              <ellipse cx="245" cy="192" rx="44" ry="53" fill="#f9f5e9" />
              <ellipse cx="326" cy="184" rx="43" ry="55" fill="#f9f5e9" />
              <g className="bird-pupils">
                <ellipse cx="257" cy="202" rx="12" ry="19" fill="#20221f" stroke="none" />
                <ellipse cx="335" cy="196" rx="12" ry="19" fill="#20221f" stroke="none" />
                <circle cx="259" cy="195" r="3" fill="#fff" stroke="none" />
                <circle cx="337" cy="189" r="3" fill="#fff" stroke="none" />
              </g>
              <g className="bird-lids">
                <path d="M201 185c5-54 58-68 87-21l-2 25Z" fill="#a0aa93" />
                <path d="M284 174c9-54 67-61 84-8l1 17Z" fill="#a0aa93" />
              </g>
            </g>
            <g className="bird-beak">
              <path d="M266 234c17-17 32-18 48-8l-15 39c-4 10-16 9-22 0Z" fill="#f2ae61" />
              <path d="m268 239 20 8 23-17" strokeWidth="4" />
              <path d="m282 233 1-2" strokeWidth="4" />
            </g>
            <g className="bird-blush" opacity="0" stroke="none" fill="#e99875">
              <ellipse cx="224" cy="243" rx="20" ry="9" /><ellipse cx="351" cy="236" rx="18" ry="9" />
            </g>
            <g className="accessory accessory-glasses">
              <path d="m196 175 87 4-8 33c-3 20-63 21-71-1Zm91 4 85-12-1 36c-4 22-62 29-70 11Z" fill="#20221f" />
              <path d="m211 184 17 25m9-24 13 19m60-18 14 19m11-22 10 15" stroke="#f7f2e7" strokeWidth="4" />
              <path d="m281 187 16-1m-106-10-12-5m195-7 12-6" />
            </g>
            <g className="accessory accessory-tear" strokeWidth="4">
              <path d="M218 224s-18 28-8 38c12 10 25-2 17-18Z" fill="#c2d9bd" />
            </g>
            <g className="accessory accessory-anger" strokeWidth="8">
              <path d="m210 157 61 23m29-9 54-25" />
            </g>
            <g className="accessory accessory-hat">
              <path d="M157 124c14-76 150-92 200-28l23 31-96 20-82-13Z" fill="#d6f56a" />
              <path d="M200 131c68 10 162-46 188-28 18 13-9 37-36 39l-81 7" fill="#d6f56a" />
              <path d="m247 101 6-9 10 3-2 10-11 2Z" fill="#20221f" stroke="none" />
            </g>
            <g className="accessory accessory-helmet">
              <path d="M152 215c-26-149 206-213 247-63 8 29 4 55-7 74" stroke="#f7f2e7" strokeWidth="18" />
              <path d="M152 215c-26-149 206-213 247-63 8 29 4 55-7 74" strokeWidth="5" />
              <path d="m184 261 12 30c62 24 139 8 171-36l-2-26c-54 39-123 52-181 32Z" fill="#f7f2e7" />
            </g>
            <g className="accessory accessory-diamond">
              <path d="m346 117 18-19 20 2 15 24-32 34Z" fill="#d6f56a" strokeWidth="4" />
              <path d="m346 117 53 7m-32 34-5-39 22-19" strokeWidth="3" />
            </g>
          </g>
          <path d="m277 370 13-7 12 8-4 17-18 1Z" stroke="#f4efe4" strokeWidth="3" opacity=".7" />
        </g>
      </g>
    </svg>
  );
}

export function BirdIcon({ className = '' }: { className?: string }) {
  return <svg className={`bird-icon ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <path d="M12 27 9 13l14 6L28 6l9 14c16 0 23 8 23 20 0 13-11 19-24 19C20 59 9 48 12 27Z" fill="currentColor" />
    <ellipse cx="31" cy="33" rx="9" ry="11" fill="#f4efe4" /><ellipse cx="47" cy="31" rx="8" ry="11" fill="#f4efe4" />
    <path d="m24 28 14 2m3-3 12-2" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="33" cy="36" rx="2.5" ry="4" fill="currentColor" /><ellipse cx="48" cy="34" rx="2.5" ry="4" fill="currentColor" />
    <path d="m35 44 12-3-6 11Z" fill="#d6f56a" />
  </svg>;
}

export function Crumb({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
    <path d="m12 12 25-6 17 18-10 29-27-4L5 30Z" fill="#f2bb72" stroke="#20221f" strokeWidth="3" />
    <path d="m18 20 16-4 10 12-7 16-15-4-6-11Z" fill="#f7dc9c" /><path d="m26 25 1 1m7 9 1-1m-11 1 1 1" stroke="#b8763b" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}
