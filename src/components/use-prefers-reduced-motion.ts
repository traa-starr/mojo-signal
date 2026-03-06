"use client";

import { useEffect, useState } from "react";
import { useMounted } from "./use-mounted";

export function usePrefersReducedMotion() {
  const mounted = useMounted();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [mounted]);

  return reducedMotion;
}
