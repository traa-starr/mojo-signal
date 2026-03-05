import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mojo.signal",
  description: "an invention-forward landing page for mojo.signal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fffaf5] antialiased">{children}</body>
    </html>
  );
}
