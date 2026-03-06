import Link from "next/link";

export default function MixerPage() {
  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl">/mixer</h1>
      <p className="mt-4">vst gadget route. prototype links + chain-aware plugin utility shelf.</p>
      <Link href="https://github.com/traa-starr" className="mt-5 inline-block underline" target="_blank" rel="noreferrer">
        open external vst resources
      </Link>
    </main>
  );
}
