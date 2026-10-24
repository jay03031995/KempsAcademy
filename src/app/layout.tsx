import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteSettings.academyName} | Practical Aesthetics & Cosmetology Training`,
    template: `%s | ${siteSettings.academyName}`,
  },
  description:
    "Build practical skills in aesthetics and cosmetology with structured courses and workshops, supervised hands-on training, and verified trainer-led instruction.",
};

// Deliberately minimal: /studio renders its own full-page UI and must not
// inherit the marketing site's Header/Footer. Those live in
// src/app/(site)/layout.tsx instead, scoped to the public site routes only.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
