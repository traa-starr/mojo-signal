"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/src/lib/content";
import { EmbedCard } from "./embed-card";

type ModulesProps = {
  onSignalHover: (key: string | null) => void;
  reducedMotion: boolean;
};

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function slugFromUrl(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  const parts = trimmed.split("/").filter(Boolean);
  return (parts[parts.length - 1] ?? "track").toLowerCase();
}

export function Modules({ onSignalHover, reducedMotion }: ModulesProps) {
  return (
    <section className="space-y-6 px-8 py-10">
      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="module-card"
        whileHover={reducedMotion ? undefined : { x: 6, y: -3 }}
        onHoverStart={() => onSignalHover("module:about")}
        onHoverEnd={() => onSignalHover(null)}
      >
        <p className="module-label">about</p>
        <div className="ascii-divider">+---- channel introduction ----+</div>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[color:var(--ink)]">{content.about}</p>
      </motion.article>

      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.62, ease: "easeOut", delay: 0.05 }}
        className="module-card"
      >
        <p className="module-label">projects</p>
        <div className="ascii-divider">+---- active transmissions ----+</div>
        <div className="mt-4 space-y-3">
          {content.projects.map((project) => (
            <motion.div
              key={project.name}
              whileHover={reducedMotion ? undefined : { x: 8, y: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onHoverStart={() => onSignalHover(`project:${project.name}`)}
              onHoverEnd={() => onSignalHover(null)}
              className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-soft)] p-4"
            >
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-none"
              >
                <h3 className="glitch-hover text-lg text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--violet)]">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{project.note}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.article>

      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.64, ease: "easeOut", delay: 0.1 }}
        className="module-card"
        onHoverStart={() => onSignalHover("module:music")}
        onHoverEnd={() => onSignalHover(null)}
      >
        <p className="module-label">music</p>
        <div className="ascii-divider">+---- signal archive ----+</div>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {content.music.map((track, index) => {
            const slug = slugFromUrl(track.url);
            return (
              <motion.div
                key={track.url}
                whileHover={reducedMotion ? undefined : { x: index % 2 === 0 ? 5 : -5, y: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                onHoverStart={() => onSignalHover(`music:${slug}`)}
                onHoverEnd={() => onSignalHover("module:music")}
              >
                <EmbedCard url={track.url} />
              </motion.div>
            );
          })}
        </div>
      </motion.article>

      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.66, ease: "easeOut", delay: 0.14 }}
        className="module-card"
        onHoverStart={() => onSignalHover("module:links")}
        onHoverEnd={() => onSignalHover(null)}
      >
        <p className="module-label">links</p>
        <div className="ascii-divider">+---- external vectors ----+</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {content.links.map((link) => (
            <motion.div
              key={link.label}
              whileHover={reducedMotion ? undefined : { scale: 1.06, y: -2, boxShadow: "0 8px 22px rgba(123, 77, 255, 0.14)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="rounded-full"
              onHoverStart={() => onSignalHover(`link:${link.label}`)}
              onHoverEnd={() => onSignalHover("module:links")}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-[color:var(--ink)] transition hover:border-[color:var(--violet)] hover:text-[color:var(--violet)]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.article>

      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.68, ease: "easeOut", delay: 0.16 }}
        className="module-card"
      >
        <p className="module-label">donate</p>
        <div className="ascii-divider">+---- support channel ----+</div>
        <motion.div
          whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2, boxShadow: "0 10px 26px rgba(255, 153, 111, 0.22)" }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="mt-4 inline-block rounded-full"
          onHoverStart={() => onSignalHover("donate")}
          onHoverEnd={() => onSignalHover(null)}
        >
          <Link
            href={content.donate.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full border border-[color:var(--line)] bg-[color:var(--bg-soft)] px-5 py-2 text-sm text-[color:var(--ink)] transition hover:border-[color:var(--peach)] hover:text-[color:var(--violet)]"
          >
            donate via paypal
          </Link>
        </motion.div>
      </motion.article>
    </section>
  );
}
