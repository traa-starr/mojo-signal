"use client";

import { motion } from "framer-motion";

type SignalPanelProps = {
  signalText: string;
  ambientOn: boolean;
};

export function SignalPanel({ signalText, ambientOn }: SignalPanelProps) {
  return (
    <aside className="signal-panel sticky top-0 flex h-screen flex-col justify-between border-r border-[color:var(--line)] px-8 py-10">
      <div className="space-y-5">
        <p className="text-xs tracking-[0.3em] text-[color:var(--muted)]">mojo.signal</p>
        <div className="ascii-divider">+===========================+</div>
        <div className="space-y-2">
          <p className="text-[11px] tracking-[0.22em] text-[color:var(--muted)]">current signal</p>
          <p className="min-h-6 text-sm text-[color:var(--ink)]">{signalText}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[color:var(--muted)]">
          <motion.span
            animate={ambientOn ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-[color:var(--violet)]"
          />
          <span>signal live</span>
        </div>
        <p className="ascii-divider">:: desktop-first transmission ::</p>
      </div>
    </aside>
  );
}
