export const content = {
  title: "mojo signal // milk & honey",
  about: {
    definition:
      "mojo signal is a permissioned collaboration studio where cryptography, generative ai, and music rituals converge into living software.",
    goals:
      "build humane, playful, chain-aware tools that feel like art objects while solving real workflow friction for creators.",
    who:
      "i'm trajaun: systems engineer + artist, building interfaces that oscillate between notebook clarity and transcendent internet-native weirdness.",
  },
  repeatedHeader: "m o j o",
  tagline: "milk & honey",
  projects: [
    {
      name: "permchainoauth",
      url: "https://github.com/traa-starr/newperms",
      note: "wallet-native oauth delegation + collab receipts minted on-chain",
    },
    {
      name: "mojo signal",
      url: "https://github.com/traa-starr/mojo-signal",
      note: "glitch-rhythm artist portal with lunar intelligence + vibe memory",
    },
    {
      name: "living library",
      url: "https://github.com/traa-starr/live-lib",
      note: "premium archive shell for readable ritual knowledge systems",
    },
  ],
  music: [
    {
      title: "jazz journal feat mojo",
      url: "https://soundcloud.com/kursedkaneke/jazz-journal-feat-mojo-prod",
    },
    {
      title: "jazz primus x traa corporate",
      url: "https://soundcloud.com/submergedarchives/jazz-primus-x-traa-corporate",
    },
    {
      title: "wake up really ft traa",
      url: "https://soundcloud.com/submergedarchives/bonus-wake-up-really-ft-traa",
    },
    {
      title: "vamp life set",
      url: "https://soundcloud.com/mojogotmilk/sets/vamp-life",
    },
  ],
  socials: [
    { label: "🐙 github", url: "https://github.com/traa-starr" },
    { label: "☁️ soundcloud", url: "https://soundcloud.com/mojogotmilk" },
    { label: "📸 instagram", url: "https://www.instagram.com/trajaun12154" },
    { label: "📨 email", url: "mailto:traa.starr@gmail.com" },
  ],
  futureRoutes: ["/vault", "/oracle", "/mixer", "/garden"],
  donate: {
    label: "fuel the signal",
    url: "https://www.paypal.com/paypalme/trajauncampbell",
  },
};

export type MojoContent = typeof content;
