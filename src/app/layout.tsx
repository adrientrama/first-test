import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Rejoins la waitlist et sois le premier informé.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
