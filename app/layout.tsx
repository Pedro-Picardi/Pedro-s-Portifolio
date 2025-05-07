import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro's Portifolio",
  description:
    "Hey! Nice to meet you here. That's my personal board with some of my projects and thoughts. Sit down, grab a coffee and take a look around.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
