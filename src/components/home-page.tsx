"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { content as landingContent } from "@/src/lib/content";

type Content = typeof landingContent;

const asciiDivider = "// ----------------------------------------------";

function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.section>
  );
}

function AmbientDots() {
  return (
    <div className="flex items-center gap-1" aria-label="ambient loading signal">
      <span className="ambient-dot" />
      <span className="ambient-dot animation-delay-150" />
      <span className="ambient-dot animation-delay-300" />
    </div>
  );
}

function EmbedCard({
  title,
  embedUrl,
}: {
  title: string;
  embedUrl: string;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="rounded-2xl border border-[#f3ddd5] bg-white/80 p-4 shadow-[0_10px_30px_rgba(246,121,91,0.08)]">
      <h4 className="mb-3 text-sm tracking-[0.18em] text-[#9f4f3c]">{title}</h4>
      <div className="relative overflow-hidden rounded-xl border border-[#f6d7cd] bg-[#fff7f3]">
        {loading && (
          <div className="h-[140px] w-full animate-pulse bg-gradient-to-r from-[#fde8df] via-[#fff6f2] to-[#f5dcff]" />
        )}
        <iframe
          title={title}
          src={embedUrl}
          allow="autoplay"
          loading="lazy"
          onLoad={() => setLoading(false)}
          className={`h-[140px] w-full ${loading ? "hidden" : "block"}`}
        />
      </div>
    </article>
  );
}

export function HomePage({ content }: { content: Content }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-8 text-[#25171a] md:px-10">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 lg:grid-cols-[330px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:self-start">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-[#f7d8ce] bg-white/70 p-6 backdrop-blur-sm">
            <div className="space-y-5">
              <p className="text-xs tracking-[0.24em] text-[#9f4f3c]">{asciiDivider}</p>
              <h1 className="text-3xl font-semibold lowercase tracking-tight text-[#2f1820]">
                {content.title}
              </h1>
              <div>
                <p className="text-xs tracking-[0.2em] text-[#a16557]">current signal</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4a2d34]">
                  {content.currentSignal}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.status.map((chip) => (
                  <span
                    key={chip.label}
                    className="rounded-full border border-[#f2b9a8] bg-[#fff0ea] px-3 py-1 text-xs tracking-[0.14em] text-[#7f3045]"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <AmbientDots />
              <p className="text-xs tracking-[0.16em] text-[#8c6a73]">
                {prefersReducedMotion ? "ambient signal: stable" : "ambient signal: pulsing"}
              </p>
            </div>
          </div>
        </aside>

        <main className="space-y-10 pb-16">
          <FadeInSection>
            <section className="rounded-3xl border border-[#f7d8ce] bg-white p-7">
              <p className="mb-4 text-xs tracking-[0.24em] text-[#9f4f3c]">{asciiDivider}</p>
              <h2 className="text-2xl lowercase text-[#2f1820]">about</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3f2930]">{content.about}</p>
            </section>
          </FadeInSection>

          <FadeInSection delay={0.08}>
            <section className="rounded-3xl border border-[#f7d8ce] bg-white p-7">
              <p className="mb-4 text-xs tracking-[0.24em] text-[#9f4f3c]">{asciiDivider}</p>
              <h2 className="text-2xl lowercase text-[#2f1820]">projects</h2>
              {content.projects.length === 0 ? (
                <p className="mt-4 text-sm text-[#6e4f56]">new builds are warming up. check back soon.</p>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {content.projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.href}
                      className="group rounded-2xl border border-[#f2d2ff] bg-[#fffbff] p-4 transition duration-300 hover:border-[#a855f7] hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
                    >
                      <h3 className="text-lg lowercase text-[#3c1d45]">{project.name}</h3>
                      <p className="mt-2 text-sm text-[#573c60]">{project.summary}</p>
                      <p className="mt-3 text-xs tracking-[0.14em] text-[#8e52a8]">{project.stack}</p>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </FadeInSection>

          <FadeInSection delay={0.16}>
            <section className="rounded-3xl border border-[#f7d8ce] bg-white p-7">
              <p className="mb-4 text-xs tracking-[0.24em] text-[#9f4f3c]">{asciiDivider}</p>
              <h2 className="text-2xl lowercase text-[#2f1820]">music</h2>
              {content.music.length === 0 ? (
                <p className="mt-4 text-sm text-[#6e4f56]">no tracks queued yet. soundcheck in progress.</p>
              ) : (
                <div className="mt-5 grid gap-4">
                  {content.music.map((track) => (
                    <EmbedCard key={track.title} title={track.title} embedUrl={track.embedUrl} />
                  ))}
                </div>
              )}
            </section>
          </FadeInSection>

          <FadeInSection delay={0.24}>
            <section className="rounded-3xl border border-[#f7d8ce] bg-white p-7">
              <p className="mb-4 text-xs tracking-[0.24em] text-[#9f4f3c]">{asciiDivider}</p>
              <h2 className="text-2xl lowercase text-[#2f1820]">links</h2>
              <div className="mt-4 divide-y divide-[#f6ddd5]">
                {content.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="glitch-link group flex items-center justify-between py-3"
                  >
                    <span className="text-sm tracking-[0.14em] text-[#341f2a] lowercase" data-text={link.label}>
                      {link.label}
                    </span>
                    <span className="text-sm text-[#8b6470]">{link.note}</span>
                  </a>
                ))}
              </div>
            </section>
          </FadeInSection>
        </main>
      </div>
    </div>
  );
}
