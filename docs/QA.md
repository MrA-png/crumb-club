# Delivery QA

## Verified on the supplied standalone preview

Test date: 2026-10-06. Browser: headless Chromium in the delivery environment. The HTML was loaded through Playwright's `set_content` because direct local-file and local-server navigation were restricted. This exercises the actual DOM, CSS, inline SVG and shared interaction bundle, but not a Next.js server, hydration, routing, asset request handling, or deployment infrastructure.

**34 of 34 assertions passed.** The machine-readable results are in `preview-qa-results.json`. The reproducible script is `tools/verify-preview.py`.

Coverage includes all main sections; unknown financial values; accessible buy dialog; honest prelaunch state; Escape and focus return; unavailable chart/social/contract feedback; allocation interaction and keyboard navigation; exactly 100 allocation crumbs; roadmap progression; gallery selection; actual self-contained SVG avatar/meme downloads; meme reaction state; mascot click response; OS reduced motion; manual motion pause/resume; mobile menu behavior; and zero observed runtime JavaScript errors.

No document-level horizontal overflow was observed at **320, 360, 375, 390, 430, 700, 768, 1024, 1440 and 1920 CSS pixels**. Scrollable roadmaps and avatar tracks deliberately keep local overflow within their components. Desktop and mobile screenshots were visually inspected; they are presentation snapshots, not screenshot-regression baselines.

The first-party TypeScript files in `lib/interactions/`, `lib/config.ts`, and `lib/content.ts` passed a strict compiler check against DOM/ES libraries, with only a temporary declaration for the environment-variable object. This is not a substitute for the full project typecheck with real installed React, Next.js, Motion and Lucide packages.

## Not verified in this environment

Npm registry/network access was unavailable. The actual Next.js dependency installation, production build, dependency-aware full-project typecheck, ESLint run, and the bundled Next.js Playwright suite were therefore not executed. Lighthouse, real-world mobile frame rates, bundle analysis, hydration behavior, external social/buy destinations, clipboard success on a secure deployed origin, a live metrics provider, and Safari/Firefox were not verified.

No Lighthouse score, 60-FPS guarantee, WCAG conformance certificate, financial verification, wallet integration, or production deployment is claimed.

## Release checks to run

1. Install the pinned framework dependencies, generate and commit a real lockfile, then run typecheck, lint and production build.
2. Run the Next.js Playwright tests against the real app. Inspect console/hydration output and verify actual mobile touch behavior in Safari and Android Chrome.
3. Check the configured buy, chart, explorer and social destinations, contract copy success, denied clipboard permissions, and risk dialog focus behavior on a secure origin.
4. Test the real metrics endpoint with valid, unavailable, stale, mismatched-chain/address, missing-field and malformed responses. Fixtures belong only in test files, never production UI.
5. Measure production Lighthouse/Core Web Vitals and animation performance on representative hardware. Test keyboard navigation, reduced motion, zoom, focus visibility and screen-reader announcements.
