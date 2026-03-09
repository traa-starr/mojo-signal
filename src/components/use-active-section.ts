"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionKeys: string[]) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionKeys.length) {
      return;
    }

    const visibility = new Map<string, number>();
    const targets: Element[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.getAttribute("data-signal-key");
          if (!key) {
            continue;
          }
          visibility.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let next: string | null = null;
        let score = 0.39;

        for (const key of sectionKeys) {
          const ratio = visibility.get(key) ?? 0;
          if (ratio > score) {
            score = ratio;
            next = key;
          }
        }

        setActiveKey((prev) => (prev === next ? prev : next));
      },
      {
        threshold: [0.2, 0.4, 0.55, 0.7],
        rootMargin: "-8% 0px -14% 0px",
      },
    );

    for (const key of sectionKeys) {
      const node = document.querySelector(`[data-signal-key=\"${key}\"]`);
      if (node) {
        targets.push(node);
        observer.observe(node);
      }
    }

    return () => {
      for (const target of targets) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, [sectionKeys]);

  return activeKey;
}
