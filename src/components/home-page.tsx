"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hemisphere, Moon } from "lunarphase-js";
import { createPublicClient, createWalletClient, custom, http, parseAbi } from "viem";
import { baseSepolia } from "viem/chains";
import { content } from "@/src/lib/content";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { useSignalField } from "./use-signal-field";
import { useActiveSection } from "./use-active-section";
import { SignalField } from "./signal-field";

type GrokPayload = { visual: string; summary: string };
type SignalMode = "idle" | "music" | "project";

const IDLE_SIGNALS = [
  "signal: awaiting transmission",
  "signal: desktop field in sync",
  "signal: milk & honey online",
  "signal: peach neon calm",
] as const;

const SIGNAL_BY_KEY: Record<string, string> = {
  "module:about": "signal: decoding artist statement",
  "module:current": "signal: lunar state in motion",
  "module:projects": "signal: project links armed",
  "module:music": "signal: playback portal open",
  "module:links": "signal: outbound socials live",
  donate: "signal: buy me a coffee gateway",
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

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
};

function rhythmHeader() {
  return Array.from({ length: 4 })
    .map(() => content.repeatedHeader)
    .join("   ");
}

function signalModeFromKey(key: string | null): SignalMode {
  if (!key) return "idle";
  if (key.includes("music")) return "music";
  if (key.includes("project")) return "project";
  return "idle";
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
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
    <div className="theme-widget">
      <p>theme</p>
      <button className="pill-button" onClick={toggleTheme} type="button">
        {dark ? "switch to light" : "switch to dark"}
      </button>
    </div>
  );
}

function VibeLog() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(() => {
    if (typeof window === "undefined") return "double click + write the current vibe...";
    return localStorage.getItem("mojo-vibe-log") ?? "double click + write the current vibe...";
  });

  const save = () => {
    localStorage.setItem("mojo-vibe-log", text);
    setEditing(false);
  };

  if (editing) {
    return <textarea className="vibe-editor" value={text} onChange={(event) => setText(event.target.value)} onBlur={save} autoFocus />;
  }

  return (
    <p className="vibe-preview" onDoubleClick={() => setEditing(true)} role="button" tabIndex={0}>
      {text}
    </p>
  );
}

function GrantPermButton() {
  const [state, setState] = useState("grant perm");

  const mintAccess = async () => {
    const eth = (window as Window & { ethereum?: EthereumProvider }).ethereum;
    if (!eth) {
      setState("wallet missing");
      return;
    }

    try {
      const walletClient = createWalletClient({ chain: baseSepolia, transport: custom(eth) });
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
  const reducedMotion = usePrefersReducedMotion();
  const [loading, setLoading] = useState(true);
  const [grok, setGrok] = useState<GrokPayload | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const [signalText, setSignalText] = useState<string>(IDLE_SIGNALS[0]);
  const [activeTrack, setActiveTrack] = useState<{ title: string; url: string } | null>(null);

  const sectionKeys = useMemo(
    () => ["module:about", "module:current", "module:projects", "module:music", "module:links", "donate"],
    [],
  );
  const activeKey = useActiveSection(sectionKeys);
  const effectiveKey = hoveredKey ?? activeKey;
  const signalMode = signalModeFromKey(effectiveKey);
  useSignalField(reducedMotion, signalMode);

  const moon = useMemo(() => {
    const date = new Date();
    const phase = Moon.lunarPhase(date);
    const emoji = Moon.lunarPhaseEmoji(date, { hemisphere: Hemisphere.NORTHERN });
    return { phase, emoji, ascii: phaseVisuals[phase] ?? "( ? )" };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (effectiveKey) {
      return;
    }
    const timer = setInterval(() => setIdleIndex((current) => (current + 1) % IDLE_SIGNALS.length), 3400);
    return () => clearInterval(timer);
  }, [effectiveKey]);

  const targetSignalText = effectiveKey ? (SIGNAL_BY_KEY[effectiveKey] ?? IDLE_SIGNALS[idleIndex]) : IDLE_SIGNALS[idleIndex];

  useEffect(() => {
    if (reducedMotion || !effectiveKey) {
      return;
    }

    let tick = 0;
    const max = 8;
    const glyphs = "<>/\\[]{}=+*#";
    const timer = setInterval(() => {
      tick += 1;
      const ratio = tick / max;
      const reveal = Math.floor(targetSignalText.length * ratio);
      const next = targetSignalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < reveal) return targetSignalText[index];
          return glyphs[(index + tick) % glyphs.length];
        })
        .join("");
      setSignalText(tick >= max ? targetSignalText : next);
    }, 30);

    return () => clearInterval(timer);
  }, [effectiveKey, reducedMotion, targetSignalText]);

  useEffect(() => {
    const fetchGrok = async () => {
      try {
        const response = await fetch("/api/grok", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ phase: moon.phase }),
        });
        if (!response.ok) return;
        setGrok((await response.json()) as GrokPayload);
      } catch {
        // fallback text handled in view
      }
    };

    fetchGrok();
  }, [moon.phase]);

  return (
    <div className="page-frame" data-signal-mode={signalMode}>
      <SignalField mode={signalMode} />
      <ThemeToggle />

      <AnimatePresence>
        {loading ? (
          <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="loading-line">{rhythmHeader()}</p>
            <p className="loading-sub">transcendent signal booting...</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <aside className="signal-dock" aria-live="polite">
        <p className="hero-topline">+== current signal ==+</p>
        <p className="mono">{reducedMotion || !effectiveKey ? targetSignalText : signalText}</p>
      </aside>

      <div className="home-shell">
        <header className="hero-panel">
          <div className="hero-topline">~~ &#123; ascii curls &#125; ~~</div>
          <h1 className="hero-glitch" data-text={content.repeatedHeader}>{rhythmHeader()}</h1>
          <p className="hero-tag">{content.tagline}</p>
        </header>

        <section id="section-about" data-signal-key="module:about" className="grid-panel reveal-on-scroll" onMouseEnter={() => setHoveredKey("module:about")} onMouseLeave={() => setHoveredKey(null)}>
          <article className="soft-card center-copy">
            <p className="ascii-line">+== about ==+</p>
            <p>{content.about.definition}</p>
            <p>{content.about.goals}</p>
            <p>{content.about.who}</p>
          </article>

          <article id="section-current" data-signal-key="module:current" className="soft-card" onMouseEnter={() => setHoveredKey("module:current")} onMouseLeave={() => setHoveredKey(null)}>
            <p className="ascii-line">+== current signal ==+</p>
            <p className="mono">moon phase: {moon.phase}</p>
            <p className="mono">{moon.emoji} {moon.ascii}</p>
            <p className="mono">grok visual: {grok?.visual ?? "generating..."}</p>
            <p className="mono">summary: {grok?.summary ?? "syncing cosmic notes..."}</p>
            <VibeLog />
          </article>
        </section>

        <section id="section-projects" data-signal-key="module:projects" className="soft-card reveal-on-scroll" onMouseEnter={() => setHoveredKey("module:projects")} onMouseLeave={() => setHoveredKey(null)}>
          <p className="ascii-line">+== projects ==+</p>
          <ul className="project-list">
            {content.projects.map((project) => (
              <li key={project.name} onMouseEnter={() => setHoveredKey("module:projects")}>
                <Link href={project.url} target="_blank" rel="noreferrer" className="glitch-link" data-text={project.name}>{project.name}</Link>
                <span>{project.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="section-music" data-signal-key="module:music" className="soft-card reveal-on-scroll" onMouseEnter={() => setHoveredKey("module:music")} onMouseLeave={() => setHoveredKey(null)}>
          <p className="ascii-line">+== music portal ==+</p>
          <div className="music-grid">
            {content.music.map((track) => (
              <button key={track.url} type="button" className="music-pill" onClick={() => setActiveTrack(track)}>
                play: {track.title}
              </button>
            ))}
          </div>
        </section>

        <section id="section-links" data-signal-key="module:links" className="soft-card reveal-on-scroll" onMouseEnter={() => setHoveredKey("module:links")} onMouseLeave={() => setHoveredKey(null)}>
          <p className="ascii-line">+== socials ==+</p>
          <ul className="social-list">
            {content.socials.map((social) => (
              <li key={social.label}><Link href={social.url} target="_blank" rel="noreferrer">{social.label}</Link></li>
            ))}
          </ul>
        </section>

        <section id="section-donate" data-signal-key="donate" className="soft-card reveal-on-scroll donate-card" onMouseEnter={() => setHoveredKey("donate")} onMouseLeave={() => setHoveredKey(null)}>
          <p className="ascii-line">+== buy me a coffee ==+</p>
          <p className="mono">support future modules + late night signal experiments.</p>
          <div className="route-list">
            <Link href={content.donate.url} className="pill-button" target="_blank" rel="noreferrer">{content.donate.label}</Link>
            <GrantPermButton />
          </div>
        </section>

        <section className="soft-card reveal-on-scroll">
          <p className="ascii-line">+== future routes ==+</p>
          <div className="route-list">
            {content.futureRoutes.map((route) => <Link key={route} href={route} className="pill-button">{route}</Link>)}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {activeTrack ? (
          <motion.div className="player-dock" initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}>
            <div className="player-header">
              <p>now playing: {activeTrack.title}</p>
              <button className="pill-button" type="button" onClick={() => setActiveTrack(null)}>close</button>
            </div>
            <iframe
              title={activeTrack.title}
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(activeTrack.url)}`}
              allow="autoplay"
              loading="lazy"
              className="player-frame"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
