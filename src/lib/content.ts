export const content = {
  title: "mojo signal // milk & honey frequency",
  about:
    "definition: mojo signal is a soft-tech transmission lab for permissioned collaboration, ritual software, and internet-native art systems. goals: prototype humane creative infrastructure that feels alive, playful, and deeply useful. who i am: trajaun is a systems builder + sonic artist designing where cryptography, vibe coding, and culture tools overlap.",
  repeatedHeader: "m o j o ( t r a j a u n )",
  tagline: "milk & honey frequency",
  projects: [
    {
      name: "permchainoauth",
      displayName: "permchainoauth",
      url: "https://github.com/traa-starr/newperms",
      note: "wallet-native oauth delegation + receipt graph for collab access",
    },
    {
      name: "living library",
      displayName: "living library",
      url: "https://github.com/traa-starr/live-lib",
      note: "readable premium archive + knowledge flow ui for modern rituals",
    },
    {
      name: "mojo signal",
      displayName: "mojo signal",
      url: "https://github.com/traa-starr/mojo-signal",
      note: "transcendent artist homepage with moon-state intelligence and rhythm motifs",
    },
  ],
  music: [
    { url: "https://soundcloud.com/kursedkaneke/jazz-journal-feat-mojo-prod" },
    { url: "https://soundcloud.com/submergedarchives/jazz-primus-x-traa-corporate" },
    { url: "https://soundcloud.com/submergedarchives/bonus-wake-up-really-ft-traa" },
    { url: "https://soundcloud.com/submergedarchives/jazz-primus-x-traa-o-2025-prod" },
    { url: "https://soundcloud.com/mojogotmilk/sets/vamp-life" },
  ],
  links: [
    { label: "github", url: "https://github.com/traa-starr" },
    { label: "soundcloud", url: "https://soundcloud.com/mojogotmilk" },
    { label: "instagram", url: "https://www.instagram.com/mojogotmilk" },
    { label: "twitch", url: "https://www.twitch.tv/mojogotmilk" },
  ],
  donate: { label: "donate", url: "https://paypal.me/traa333" },
  futureRoutes: [
    { href: "/vault", label: "/vault", note: "rosin / flower tracker placeholder" },
    { href: "/oracle", label: "/oracle", note: "bpm + key finder lab" },
    { href: "/mixer", label: "/mixer", note: "vst gadget launchpad" },
    { href: "/garden", label: "/garden", note: "idea generator nursery" },
  ],
  grantPerm: {
    chainId: 8453,
    chainName: "base",
    contractAddress: "0x0000000000000000000000000000000000000000",
    functionName: "mintCollabAccess",
  },
  aiPrompts: {
    moonVisual:
      "transcendent moon glyph artwork in pastel orange and purple, soft glitch aura, minimal linework, lowercase internet-native tone",
    vibeSummary:
      "summarize current vibe in one punchy lowercase sentence, include the words transcendent and pinnacle of human tech in 2026",
  },
} as const;
