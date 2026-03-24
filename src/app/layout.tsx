import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Beard — Email Builder",
  description: "Build on-brand HTML emails and push to Klaviyo",
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
