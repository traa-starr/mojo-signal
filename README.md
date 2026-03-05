# mojo.signal v0.1

desktop-first landing page built with next.js + tailwind + framer motion.

## run locally

```bash
npm install
npm run dev
```

open `http://localhost:3000`.

## production build

```bash
npm run build
npm run start
```

## design notes

- light-mode only with warm white base, peach primary tones, and electric-violet accents.
- split desktop composition: sticky left signal panel + right-side scroll narrative.
- all-lowercase copy with intentional ascii dividers as rhythm markers.
- motion-forward interactions via framer motion fade-ins and subtle hover glitch.
- reduced-motion users get minimal transitions and no heavy hover effects.
- content is data-driven via `src/lib/content.ts` (no cms, no backend).
