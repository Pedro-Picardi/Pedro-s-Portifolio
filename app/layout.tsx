import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import LinkBar from "./components/LinkBar";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className={`antialiased`}>
        <NavBar />
        {children}
        <LinkBar />
        <SpeedInsights />
        </body>
    </html>
  );
}
