export type StatusChip = {
  label: string;
};

export type Project = {
  name: string;
  summary: string;
  href: string;
  stack: string;
};

export type MusicEntry = {
  title: string;
  embedUrl: string;
  platform: "soundcloud" | "spotify";
};

export type LinkEntry = {
  label: string;
  href: string;
  note: string;
};

export const content = {
  title: "mojo.signal",
  currentSignal:
    "building identity systems and audio worlds that feel like tomorrow.",
  status: [
    { label: "building" },
    { label: "shipping" },
    { label: "listening" },
  ] satisfies StatusChip[],
  about:
    "i am a product-minded engineer and sound artist exploring protocols, interfaces, and rhythm. mojo.signal is where clean systems design meets noisy human texture.",
  projects: [
    {
      name: "permchain oauth",
      summary:
        "oauth flow experiments for sovereign identity: secure, minimal, and composable.",
      href: "#",
      stack: "next.js · auth · protocol ux",
    },
    {
      name: "signal canvas",
      summary:
        "desktop-first creative dashboard for drafting visual motifs from ascii + motion primitives.",
      href: "#",
      stack: "react · motion · generative ui",
    },
    {
      name: "latency choir",
      summary:
        "collaborative sonic playground where packet delay becomes part of the composition.",
      href: "#",
      stack: "web audio · websockets · realtime",
    },
  ] satisfies Project[],
  music: [
    {
      title: "signal study 01",
      platform: "soundcloud",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/308605351&color=%23a855f7&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    },
    {
      title: "signal study 02",
      platform: "soundcloud",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/734620435&color=%23f97316&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    },
  ] satisfies MusicEntry[],
  links: [
    { label: "x", href: "https://x.com", note: "short thoughts + field notes" },
    {
      label: "github",
      href: "https://github.com",
      note: "code, experiments, and open fragments",
    },
    {
      label: "contact",
      href: "mailto:hello@mojo.signal",
      note: "collabs, commissions, and serious weird ideas",
    },
  ] satisfies LinkEntry[],
};
