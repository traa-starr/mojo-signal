"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/src/lib/content";
import { EmbedCard } from "./embed-card";

type ModulesProps = {
  onProjectHover: (name: string | null) => void;
  reducedMotion: boolean;
};

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Modules({ onProjectHover, reducedMotion }: ModulesProps) {
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
              onHoverStart={() => onProjectHover(project.name)}
              onHoverEnd={() => onProjectHover(null)}
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
      >
        <p className="module-label">music</p>
        <div className="ascii-divider">+---- signal archive ----+</div>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {content.music.map((track, index) => (
            <motion.div
              key={track.url}
              whileHover={reducedMotion ? undefined : { x: index % 2 === 0 ? 5 : -5, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <EmbedCard url={track.url} />
            </motion.div>
          ))}
        </div>
      </motion.article>

      <motion.article
        variants={reveal}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.66, ease: "easeOut", delay: 0.14 }}
        className="module-card"
        whileHover={reducedMotion ? undefined : { x: 5, y: -3 }}
      >
        <p className="module-label">links</p>
        <div className="ascii-divider">+---- external vectors ----+</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {content.links.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-[color:var(--ink)] transition hover:border-[color:var(--violet)] hover:text-[color:var(--violet)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.article>
    </section>
  );
}
