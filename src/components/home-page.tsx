"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/src/lib/content";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { useSignalField } from "./use-signal-field";
import { useActiveSection } from "./use-active-section";
import { SignalField } from "./signal-field";
import { EmbedCard } from "./embed-card";

type SignalMode = "idle" | "music" | "project";

const IDLE_SIGNALS = [
  "signal open / milk & honey",
  "transmission stable / mojo.signal",
  "editorial field online",
] as const;

const SIGNAL_BY_KEY: Record<string, string> = {
  "act:i": "arrival sequence active",
  "module:projects": "proof modules in focus",
  "module:identity": "identity trace decoding",
  "module:music": "archive chamber loading",
  "module:links": "outbound vectors armed",
  donate: "support channel live",
};

function labelFromTrackUrl(url: string) {
  const clean = url.trim().replace(/\/$/, "");
  const parts = clean.split("/").filter(Boolean);
  const slug = parts[parts.length - 1] ?? "track";
  return slug.replace(/[-_]+/g, " ").trim();
}

function signalModeFromKey(key: string | null): SignalMode {
  if (!key) return "idle";
  if (key.includes("music")) return "music";
  if (key.includes("project")) return "project";
  return "idle";
}

export function HomePage() {
  const reducedMotion = usePrefersReducedMotion();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const sectionKeys = useMemo(() => ["act:i", "module:projects", "module:identity", "module:music", "module:links", "donate"], []);
  const activeKey = useActiveSection(sectionKeys);
  const effectiveKey = hoveredKey ?? activeKey;
  const signalMode = signalModeFromKey(effectiveKey);
  useSignalField(reducedMotion, signalMode);

  useEffect(() => {
    if (effectiveKey) return;
    const timer = setInterval(() => setIdleIndex((current) => (current + 1) % IDLE_SIGNALS.length), 3200);
    return () => clearInterval(timer);
  }, [effectiveKey]);

  const signalText = effectiveKey ? (SIGNAL_BY_KEY[effectiveKey] ?? IDLE_SIGNALS[idleIndex]) : IDLE_SIGNALS[idleIndex];

  const projectFeature = content.projects[0];
  const projectSupport = content.projects[1];

  return (
    <div className="page-frame" data-signal-mode={signalMode}>
      <SignalField mode={signalMode} />

      <aside className="signal-dock" aria-live="polite">
        <p className="dock-label">live transmission</p>
        <p className="dock-copy">{signalText}</p>
      </aside>

      <main className="experience-shell">
        <section
          id="section-arrival"
          data-signal-key="act:i"
          className="arrival-act"
          onMouseEnter={() => setHoveredKey("act:i")}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <motion.p
            className="arrival-kicker"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            curated signal environment
          </motion.p>
          <motion.h1
            className="arrival-title"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="arrival-line"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: "easeOut" }}
          >
            {content.tagline} / living transmission
          </motion.p>
          <motion.div
            className="arrival-actions"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link href={content.projects[0].url} target="_blank" rel="noreferrer" className="vector-link">
              enter proof
            </Link>
            <Link href="#section-music" className="vector-link muted">
              open archive
            </Link>
          </motion.div>
        </section>

        <section className="evidence-act">
          <article
            id="section-projects"
            data-signal-key="module:projects"
            className="proof-module proof-primary"
            onMouseEnter={() => setHoveredKey("module:projects")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <p className="module-label">act ii / evidence</p>
            <h2>{projectFeature.name}</h2>
            <p>{projectFeature.note}</p>
            <Link href={projectFeature.url} target="_blank" rel="noreferrer" className="inline-vector">
              view project
            </Link>
          </article>

          <article
            id="section-identity"
            data-signal-key="module:identity"
            className="proof-module proof-identity"
            onMouseEnter={() => setHoveredKey("module:identity")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <p className="module-label">identity</p>
            <p>{content.about}</p>
          </article>

          <article className="proof-module proof-support" onMouseEnter={() => setHoveredKey("module:projects")} onMouseLeave={() => setHoveredKey(null)}>
            <p className="module-label">secondary proof</p>
            <h3>{projectSupport.name}</h3>
            <p>{projectSupport.note}</p>
            <Link href={projectSupport.url} target="_blank" rel="noreferrer" className="inline-vector">
              view project
            </Link>
          </article>
        </section>

        <section
          id="section-music"
          data-signal-key="module:music"
          className="archive-act"
          onMouseEnter={() => setHoveredKey("module:music")}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <div className="archive-head">
            <p className="module-label">act iii / archive</p>
            <h2>sound archive</h2>
          </div>
          <div className="archive-grid">
            {content.music.map((track) => (
              <div key={track.url} className="archive-item">
                <p className="track-name">{labelFromTrackUrl(track.url)}</p>
                <EmbedCard url={track.url} />
              </div>
            ))}
          </div>
        </section>

        <section
          id="section-links"
          data-signal-key="module:links"
          className="connect-act"
          onMouseEnter={() => setHoveredKey("module:links")}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <div className="links-grid">
            {content.socials
              .filter((item) => item.label !== "paypal")
              .map((social) => (
                <Link key={social.label} href={social.url} target="_blank" rel="noreferrer" className="exit-link">
                  {social.label}
                </Link>
              ))}
          </div>
          <div
            id="section-donate"
            data-signal-key="donate"
            className="donate-vector"
            onMouseEnter={() => setHoveredKey("donate")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <p className="module-label">support vector</p>
            <Link href={content.donate.url} target="_blank" rel="noreferrer" className="vector-link donate-link">
              {content.donate.label}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
