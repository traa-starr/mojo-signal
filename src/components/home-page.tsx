"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hemisphere, Moon } from "lunarphase-js";
import { createPublicClient, createWalletClient, custom, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";
import { content } from "@/src/lib/content";

type GrokPayload = {
  visual: string;
  summary: string;
};

type MusicModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
};

const phaseVisuals: Record<string, string> = {
  New: "(   )",
  "Waxing Crescent": "(  ◔)",
  "First Quarter": "( ◑ )",
  "Waxing Gibbous": "(◕  )",
  Full: "( ● )",
  "Waning Gibbous": "(  ◕)",
  "Last Quarter": "( ◐ )",
  "Waning Crescent": "(◔  )",
};

const permAbi = parseAbi(["function mint(address to, string calldata memo) external returns (uint256)"]);

function rhythmHeader() {
  return Array.from({ length: 4 })
    .map(() => content.repeatedHeader)
    .join("   ");
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const stored = localStorage.getItem("mojo-theme");
    return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("mojo-theme", next ? "dark" : "light");
  };

  return (
    <button className="pill-button" onClick={toggleTheme} type="button">
      {dark ? "switch to light" : "switch to dark"}
    </button>
  );
}

function VibeLog() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(() => {
    if (typeof window === "undefined") {
      return "double click + write the current vibe...";
    }
    return localStorage.getItem("mojo-vibe-log") ?? "double click + write the current vibe...";
  });

  const save = () => {
    localStorage.setItem("mojo-vibe-log", text);
    setEditing(false);
  };

  if (editing) {
    return (
      <textarea
        className="vibe-editor"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={save}
        autoFocus
      />
    );
  }

  return (
    <p className="vibe-preview" onDoubleClick={() => setEditing(true)} role="button" tabIndex={0}>
      {text}
    </p>
  );
}

function MusicModal({ open, onClose, title, url }: MusicModalProps) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="modal-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="modal-shell"
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3>{title}</h3>
              <button onClick={onClose} className="pill-button" type="button">
                close
              </button>
            </div>
            <iframe title={title} src={src} allow="autoplay" loading="lazy" className="mt-4 h-[180px] w-full rounded-xl border" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GrantPermButton() {
  const [state, setState] = useState("grant perm");

  const mintAccess = async () => {
    const eth = (window as Window & { ethereum?: { request: (...args: unknown[]) => Promise<unknown> } }).ethereum;
    if (!eth) {
      setState("wallet missing");
      return;
    }

    try {
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(eth as any),
      });
      const [account] = await walletClient.requestAddresses();
      const contractAddress = process.env.NEXT_PUBLIC_PERMCHAINOAUTH_CONTRACT as `0x${string}` | undefined;
      if (!contractAddress) {
        setState("set NEXT_PUBLIC_PERMCHAINOAUTH_CONTRACT");
        return;
      }

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: permAbi,
        functionName: "mint",
        args: [account, `mojo-collab-${Date.now()}`],
        account,
        chain: baseSepolia,
      });

      const publicClient = createPublicClient({ chain: baseSepolia, transport: http() });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setState(`receipt: ${receipt.transactionHash.slice(0, 10)}...`);
    } catch {
      setState("mint paused / rejected");
    }
  };

  return (
    <button className="pill-button" onClick={mintAccess} type="button">
      {state}
    </button>
  );
}

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [openTrack, setOpenTrack] = useState<{ title: string; url: string } | null>(null);
  const [grok, setGrok] = useState<GrokPayload | null>(null);

  const moon = useMemo(() => {
    const date = new Date();
    const phase = Moon.lunarPhase(date);
    const emoji = Moon.lunarPhaseEmoji(date, { hemisphere: Hemisphere.NORTHERN });
    return {
      phase,
      emoji,
      ascii: phaseVisuals[phase] ?? "( ? )",
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchGrok = async () => {
      try {
        const response = await fetch("/api/grok", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ phase: moon.phase }),
        });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as GrokPayload;
        setGrok(data);
      } catch {
        // no-op fallback
      }
    };

    fetchGrok();
  }, [moon.phase]);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="loading-line">{rhythmHeader()}</p>
            <p className="loading-sub">transcendent signal booting...</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="home-shell">
        <header className="hero-panel">
          <div className="hero-topline">~~ &#123; ascii curls &#125; ~~</div>
          <h1 className="hero-glitch" data-text={content.repeatedHeader}>
            {rhythmHeader()}
          </h1>
          <p className="hero-tag">{content.tagline}</p>
          <div className="hero-actions">
            <ThemeToggle />
            <Link href={content.donate.url} className="pill-button" target="_blank" rel="noreferrer">
              {content.donate.label}
            </Link>
          </div>
        </header>

        <section className="grid-panel reveal-on-scroll">
          <article className="soft-card center-copy">
            <p className="ascii-line">+== about ==+</p>
            <p>{content.about.definition}</p>
            <p>{content.about.goals}</p>
            <p>{content.about.who}</p>
          </article>

          <article className="soft-card">
            <p className="ascii-line">+== current signal ==+</p>
            <p className="mono">moon phase: {moon.phase}</p>
            <p className="mono">{moon.emoji} {moon.ascii}</p>
            <p className="mono">grok visual: {grok?.visual ?? "generating..."}</p>
            <p className="mono">summary: {grok?.summary ?? "syncing cosmic notes..."}</p>
            <VibeLog />
          </article>
        </section>

        <section className="soft-card reveal-on-scroll">
          <p className="ascii-line">+== projects ==+</p>
          <ul className="project-list">
            {content.projects.map((project) => (
              <li key={project.name}>
                <Link href={project.url} target="_blank" rel="noreferrer" className="glitch-link" data-text={project.name}>
                  {project.name}
                </Link>
                <span>{project.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="soft-card reveal-on-scroll">
          <p className="ascii-line">+== music portal ==+</p>
          <div className="music-grid">
            {content.music.map((track) => (
              <button key={track.url} type="button" className="music-pill" onClick={() => setOpenTrack(track)}>
                open: {track.title}
              </button>
            ))}
          </div>
        </section>

        <section className="soft-card reveal-on-scroll">
          <p className="ascii-line">+== socials ==+</p>
          <ul className="social-list">
            {content.socials.map((social) => (
              <li key={social.label}>
                <Link href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
          <GrantPermButton />
        </section>

        <section className="soft-card reveal-on-scroll">
          <p className="ascii-line">+== future routes ==+</p>
          <div className="route-list">
            {content.futureRoutes.map((route) => (
              <Link key={route} href={route} className="pill-button">
                {route}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <MusicModal
        open={Boolean(openTrack)}
        onClose={() => setOpenTrack(null)}
        title={openTrack?.title ?? "soundcloud"}
        url={openTrack?.url ?? ""}
      />
    </>
  );
}
