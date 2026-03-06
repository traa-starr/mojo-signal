import Link from "next/link";

export default function GardenPage() {
  return (
    <main className="home-shell">
      <section className="soft-card">
        <p className="ascii-line">+== /garden ==+</p>
        <h1>idea generator nursery</h1>
        <p>placeholder: grow prompts into launch-ready concepts with playful, modular constraints.</p>
        <Link href="/" className="pill-button">
          back home
        </Link>
      </section>
    </main>
  );
}
