<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Project rules

- **Always check docs before implementing.** Don't rely on memory for Next.js APIs — conventions change between major versions and training data may be stale. Check `node_modules/next/dist/docs/` or official docs before writing routing, data-fetching, caching, or config code. Same for Tailwind — verify class names/config against the installed version, don't assume v3 syntax works in v4.
- **Next.js 16, App Router, TypeScript, Tailwind.** No Pages Router, no CSS Modules, no styled-components.
- **No legacy patterns.** No `useEffect` for data fetching in Server Components — fetch directly with `async`/`await` in the component. No class components. No `React.FC`.
- **Server Components by default.** Only add `"use client"` when the component actually needs state, effects, or event handlers. Don't add it defensively.
- **No band-aid fixes.** If something's broken, fix the actual cause. Don't wrap in try/catch to silence an error, don't add `// @ts-ignore`, don't add arbitrary `setTimeout`/`any` to make a type error disappear.
- **No security or robustness holes.** Don't ship code that only works in the happy path. Validate/sanitize any user input before using it (forms, URL params, query strings). Never expose secrets, API keys, or credentials in client-side code — anything in a `"use client"` component or committed to the repo is public. Handle the failure case for anything that can fail: a fetch that can reject, a prop that can be undefined, an array that can be empty, a ref that can be null before mount. Don't assume external data (API responses, form input, env vars) is well-formed — check it. If a function's behavior depends on something outside its own scope (network, timing, browser APIs), state what happens when that thing is unavailable or slow.
- **Token-efficient responses.** Don't restate the whole file when a small diff will do. Don't over-explain trivial changes. Get to the code.
- **No unused deps.** Don't install a package for something Tailwind/native CSS/vanilla JS already solves.
- **No decorative complexity.** No animation libraries, no extra abstraction layers, no config files "for future flexibility" unless explicitly asked.
- **Split code into separate files where it makes sense.** Don't cram unrelated components into one file just to avoid creating new files. Follow the existing structure: components in `components/`, page-specific components can live alongside their `page.tsx`, shared types in `types/`, data in `lib/`. One component per file unless two are trivially small and always used together.
- **No spaghetti code.** Each function/component does one thing. No deeply nested ternaries or conditionals — extract to a named function or early return instead. No logic buried inside JSX — compute values above the `return` and reference them by name. Flat, linear read-top-to-bottom flow over clever one-liners.
- **Descriptive names.** No single-letter variables outside trivial loop indices. No abbreviations that aren't obvious (`btn`, `idx` fine; `usrCfg`, `handleClk` not). Name booleans as questions (`isLoading`, `hasError`). Name functions as verbs (`getProject`, `formatDate`), components/types as nouns.
- **Consistent formatting.** Match existing indentation, quote style, and import ordering already in the file — don't introduce a different style mid-file. Group imports: external packages first, then internal (`@/` aliases), then relative imports, with a blank line between groups.
- **Modern idiomatic patterns.** Prefer array methods (`.map`, `.filter`, `.find`) over manual loops where it reads cleaner. Destructure props and objects at the top of a function rather than repeated dot-access. Use TypeScript's inferred types where obvious; only annotate when it adds clarity (function params, exported values).
- **Data:** static typed objects in `lib/`, no CMS, no database, no API routes unless a contact form needs one.
- **Design:** dark, minimalist. Solid/gradient colors over decorative UI. DM Sans for headings, Onest for body text. No default Tailwind blue/gradient defaults — intentional palette only.
- **Verify with `npx tsc --noEmit`** after changes — don't assume it compiles.