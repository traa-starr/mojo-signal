"use client";

import { useEffect } from "react";

type SignalMode = "idle" | "music" | "project";

const intensityByMode: Record<SignalMode, string> = {
  idle: "0.4",
  music: "0.56",
  project: "0.6",
};

export function useSignalField(reducedMotion: boolean, mode: SignalMode) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--signal-intensity", intensityByMode[mode]);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;

    if (reducedMotion) {
      root.style.setProperty("--mx", "0.5");
      root.style.setProperty("--my", "0.22");
      return;
    }

    const pointer = window.matchMedia("(pointer: fine)");
    if (!pointer.matches) {
      root.style.setProperty("--mx", "0.5");
      root.style.setProperty("--my", "0.22");
      return;
    }

    let frame = 0;
    let pendingX = 0.5;
    let pendingY = 0.22;

    const flush = () => {
      frame = 0;
      root.style.setProperty("--mx", pendingX.toFixed(4));
      root.style.setProperty("--my", pendingY.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      pendingX = Math.min(1, Math.max(0, event.clientX / window.innerWidth));
      pendingY = Math.min(1, Math.max(0, event.clientY / window.innerHeight));

      if (!frame) {
        frame = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [reducedMotion]);
}
