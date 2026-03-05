import type { Metadata } from "next";
import { content } from "@/src/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: content.title,
  description: content.about,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
