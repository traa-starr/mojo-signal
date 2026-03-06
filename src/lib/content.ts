export const content = {
  title: "mojo.signal",
  about:
    "mojo signal is a permissioned collaboration studio where cryptography, generative ai, and music rituals converge into living software. build humane, playful, chain-aware tools that feel like art objects while solving real workflow friction for creators. i'm trajaun: systems engineer + artist, building interfaces that oscillate between notebook clarity and transcendent internet-native weirdness.",
  repeatedHeader: "m o j o",
  tagline: "milk & honey",
  projects: [
    {
      name: "PermChain OAuth",
      url: "https://github.com/traa-starr/newperms",
      note: "wallet-native oauth delegation + collab receipts minted on-chain",
    },
    {
      name: "Living Library",
      url: "https://github.com/traa-starr/live-lib",
      note: "premium dark living content library ui + content pipeline",
    },
  ],
  music: [
    { url: "https://soundcloud.com/kursedkaneke/jazz-journal-feat-mojo-prod" },
    { url: "https://soundcloud.com/submergedarchives/jazz-primus-x-traa-corporate" },
    { url: "https://soundcloud.com/submergedarchives/bonus-wake-up-really-ft-traa" },
    { url: "https://soundcloud.com/submergedarchives/jazz-primus-x-traa-o-2025-prod" },
    { url: "https://soundcloud.com/mojogotmilk/sets/vamp-life" },
  ],
  socials: [
    { label: "github", url: "https://github.com/traa-starr" },
    { label: "soundcloud", url: "https://soundcloud.com/mojogotmilk" },
    { label: "instagram", url: "https://www.instagram.com/mojogotmilk" },
    { label: "twitch", url: "https://www.twitch.tv/mojogotmilk" },
    { label: "paypal", url: "https://paypal.me/traa333" },
  ],
  futureRoutes: ["/vault", "/oracle", "/mixer", "/garden"],
  donate: {
    label: "fuel the signal",
    url: "https://paypal.me/traa333",
  },
};

export type MojoContent = typeof content;
