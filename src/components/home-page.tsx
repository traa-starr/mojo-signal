"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modules } from "./modules";
import { SignalPanel } from "./signal-panel";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { content } from "@/src/lib/content";

const IDLE_SIGNALS = [
  "signal: awaiting transmission",
  "signal: scanning modules",
  "signal: channel open",
  "signal: listening for input",
] as const;

const GLYPHS = "<>/\\[]{}=+*#@!?~";

function slugFromUrl(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  const parts = trimmed.split("/").filter(Boolean);
  return (parts[parts.length - 1] ?? "track").toLowerCase();
}

export function HomePage() {
  const reducedMotion = usePrefersReducedMotion();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const [signalText, setSignalText] = useState<string>(IDLE_SIGNALS[0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const signalMap = useMemo(() => {
    const dynamicProjectSignals = Object.fromEntries(
      content.projects.map((project) => [
        `project:${project.name}`,
        `signal: viewing ${project.name.toLowerCase()}`,
      ]),
    );

    const dynamicMusicSignals = Object.fromEntries(
      content.music.map((track) => {
        const slug = slugFromUrl(track.url);
        return [`music:${slug}`, `signal: audio ${slug}`];
      }),
    );

    const dynamicLinkSignals = Object.fromEntries(
      content.links.map((link) => [
        `link:${link.label}`,
        `signal: outbound ${link.label.toLowerCase()}`,
      ]),
    );

    return {
      "module:about": "signal: decoding bio",
      "module:music": "signal: scanning archive",
      "module:links": "signal: outbound vectors",
      donate: "signal: support the signal",
      ...dynamicProjectSignals,
      ...dynamicMusicSignals,
      ...dynamicLinkSignals,
    } as Record<string, string>;
  }, []);

  useEffect(() => {
    if (hoveredKey !== null) {
      return;
    }

    const idleInterval = setInterval(() => {
      setIdleIndex((current) => (current + 1) % IDLE_SIGNALS.length);
    }, 3500);

    return () => clearInterval(idleInterval);
  }, [hoveredKey]);

  const nextText = hoveredKey ? (signalMap[hoveredKey] ?? IDLE_SIGNALS[idleIndex]) : IDLE_SIGNALS[idleIndex];

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const shouldScramble = !reducedMotion && hoveredKey !== null;

    if (!shouldScramble) {
      const timeout = setTimeout(() => setSignalText(nextText), 0);
      return () => clearTimeout(timeout);
    }

    let tick = 0;
    const maxTicks = 10;

    intervalRef.current = setInterval(() => {
      tick += 1;
      const progress = tick / maxTicks;
      const revealCount = Math.floor(nextText.length * progress);

      const scrambled = nextText
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }

          if (index < revealCount) {
            return nextText[index];
          }

          return GLYPHS[(index + tick) % GLYPHS.length];
        })
        .join("");

      setSignalText(tick >= maxTicks ? nextText : scrambled);

      if (tick >= maxTicks && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 35);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hoveredKey, nextText, reducedMotion]);

  return (
    <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
      <SignalPanel signalText={signalText} ambientOn={!reducedMotion} />
      <main>
        <Modules onSignalHover={setHoveredKey} reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
