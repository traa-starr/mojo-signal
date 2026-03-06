"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modules } from "./modules";
import { SignalPanel } from "./signal-panel";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const IDLE_SIGNAL = "signal: awaiting transmission";
const SIGNALS: Record<string, string> = {
  "PermChain OAuth": "signal: viewing permchain oauth",
  "Living Library": "signal: viewing living library",
};

const GLYPHS = "<>/\\[]{}=+*#@!?~";

export function HomePage() {
  const reducedMotion = usePrefersReducedMotion();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [signalText, setSignalText] = useState(IDLE_SIGNAL);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextText = useMemo(() => {
    if (!hoveredProject) {
      return IDLE_SIGNAL;
    }

    return SIGNALS[hoveredProject] ?? IDLE_SIGNAL;
  }, [hoveredProject]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (reducedMotion || nextText === IDLE_SIGNAL) {
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
  }, [nextText, reducedMotion]);

  return (
    <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
      <SignalPanel signalText={signalText} ambientOn={!reducedMotion} />
      <main>
        <Modules onProjectHover={setHoveredProject} reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
