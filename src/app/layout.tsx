import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const inter = localFont({ src: "../fonts/InterTight-Variable.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const instrument = localFont({
  src: [{ path: "../fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" }, { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" }],
  variable: "--font-instrument", display: "swap",
});
const jb = localFont({ src: "../fonts/JetBrainsMono-Variable.woff2", variable: "--font-jb", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sukumard.vercel.app"),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary.slice(0, 155) + "…",
  openGraph: { title: `${PROFILE.name} — ${PROFILE.role}`, description: PROFILE.headline, images: ["/og.jpg"], type: "website" },
};
export const viewport: Viewport = { themeColor: "#f4f2ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${jb.variable}`}>
      <body>{children}</body>
    </html>
  );
}
