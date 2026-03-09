# mojo signal

transcendent next.js portal tuned for 2026 internet-native aesthetics: pastel fluidity, glitch rhythm, moon intelligence, and chain-aware collaboration actions.

## stack

- next.js app router + typescript
- framer-motion (fancy motion + modals)
- lunarphase-js (live moon phase)
- viem (wallet + on-chain receipt flow)

## local dev

```bash
npm install
npm run dev
```

open `http://localhost:3000`.

## environment variables

create `.env.local`:

```bash
# server-side grok integration (optional)
GROK_API_KEY=your_xai_api_key

# client-side contract for grant perm button (optional)
NEXT_PUBLIC_PERMCHAINOAUTH_CONTRACT=0xYourContractAddress
```

if `GROK_API_KEY` is missing, the app uses fast local fallback copy for moon visuals + vibe summaries.

## deploy to vercel

1. push your branch to github.
2. in vercel: **add new → project**.
3. import `traa-starr/mojo-signal`.
4. keep framework preset as **next.js**.
5. under **settings → environment variables**, add:
   - `GROK_API_KEY` (optional)
   - `NEXT_PUBLIC_PERMCHAINOAUTH_CONTRACT` (optional)
6. click **deploy**.
7. after deploy, test:
   - theme toggle
   - vibe log persistence
   - music modal playback
   - grant perm wallet flow

## routes

- `/` home experience
- `/vault` rosin / flower tracker placeholder
- `/oracle` bpm + key finder placeholder
- `/mixer` vst gadget route
- `/garden` idea generator route
