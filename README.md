# mojo signal

transcendent next.js artist site with pastel/glitch duality, moon-phase intelligence, editable vibe logging, soundcloud modal previews, and future-lab routes.

## stack

- next.js app router + typescript
- framer-motion for playful fancy motion
- lunarphase-js for live moon state
- viem utility usage for on-chain tx value formatting

## local dev

```bash
npm install
npm run dev
```

open `http://localhost:3000`.

## env for generative ai + wallet flow

create `.env.local`:

```bash
NEXT_PUBLIC_GROK_API_KEY=your_grok_key_here
```

- if `NEXT_PUBLIC_GROK_API_KEY` is present, the homepage requests Grok summaries/visual microcopy from xAI.
- if not present, local fallback text keeps UI fast and resilient.
- `grant perm` uses injected wallet (`window.ethereum`) and sends a minimal tx placeholder to the configured contract address in `src/lib/content.ts`.

## deploy to vercel

1. push your branch to github.
2. in vercel, click **add new → project**.
3. import `traa-starr/mojo-signal`.
4. framework preset should auto-detect **next.js**.
5. in project settings → environment variables, set:
   - `NEXT_PUBLIC_GROK_API_KEY` (optional but recommended for live ai copy).
6. click **deploy**.
7. (optional) attach custom domain and enable analytics.

## routes

- `/` home signal experience
- `/vault` rosin/flower tracker placeholder
- `/oracle` bpm/key finder placeholder
- `/mixer` vst gadget link zone
- `/garden` idea generator placeholder
