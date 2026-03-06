import Link from "next/link";

export default function OraclePage() {
  return (
    <main className="home-shell">
      <section className="soft-card">
        <p className="ascii-line">+== /oracle ==+</p>
        <h1>bpm + key finder</h1>
        <p>placeholder: upload loops, detect bpm/key instantly, and emit mix-ready metadata.</p>
        <Link href="/" className="pill-button">
          back home
        </Link>
      </section>
    </main>
  );
}
