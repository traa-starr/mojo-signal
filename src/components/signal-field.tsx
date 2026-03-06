"use client";

type SignalFieldProps = {
  mode: "idle" | "music" | "project";
};

export function SignalField({ mode }: SignalFieldProps) {
  return <div aria-hidden className="signal-field" data-signal-mode={mode} />;
}
