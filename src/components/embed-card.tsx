"use client";

import { useMemo, useState } from "react";

type EmbedCardProps = {
  title: string;
  trackUrl: string;
};

export function EmbedCard({ title, trackUrl }: EmbedCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = useMemo(() => {
    const encoded = encodeURIComponent(trackUrl);
    return `https://w.soundcloud.com/player/?url=${encoded}`;
  }, [trackUrl]);

  return (
    <article className="module-card relative overflow-hidden">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm text-[color:var(--ink)]">{title}</h3>
        <span className="text-xs tracking-[0.16em] text-[color:var(--muted)]">soundcloud</span>
      </header>
      <div className="relative">
        {!loaded && !errored ? (
          <div className="embed-skeleton absolute inset-0 flex items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-soft)] text-xs text-[color:var(--muted)]">
            loading signal stream...
          </div>
        ) : null}
        {errored ? (
          <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-soft)] px-4 py-10 text-sm text-[color:var(--muted)]">
            unable to load audio embed. open track directly:
            <a
              href={trackUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-[color:var(--violet)] underline decoration-dotted underline-offset-4"
            >
              {trackUrl}
            </a>
          </div>
        ) : (
          <iframe
            title={title}
            src={src}
            allow="autoplay"
            loading="lazy"
            className={`h-[166px] w-full rounded-lg border border-[color:var(--line)] transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        )}
      </div>
    </article>
  );
}
