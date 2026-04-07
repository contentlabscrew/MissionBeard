import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChoreChamp — Earn Screen Time!",
  description: "Kids earn screen time by completing chores",
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
