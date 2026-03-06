import Link from "next/link";

export default function MixerPage() {
  return (
    <main className="home-shell">
      <section className="soft-card">
        <p className="ascii-line">+== /mixer ==+</p>
        <h1>vst gadget lab</h1>
        <p>placeholder: a utility shelf for chain-aware plugin recipes and sonic gadget references.</p>
        <div className="route-list">
          <Link href="https://github.com/traa-starr" target="_blank" rel="noreferrer" className="pill-button">
            open external vst resources
          </Link>
          <Link href="/" className="pill-button">
            back home
          </Link>
        </div>
      </section>
    </main>
  );
}
