import Link from "next/link";

export default function VaultPage() {
  return (
    <main className="home-shell">
      <section className="soft-card">
        <p className="ascii-line">+== /vault ==+</p>
        <h1>rosin / flower tracker</h1>
        <p>placeholder: catalog strains, terpene notes, and ritual outcomes with calm, searchable logs.</p>
        <Link href="/" className="pill-button">
          back home
        </Link>
      </section>
    </main>
  );
}
