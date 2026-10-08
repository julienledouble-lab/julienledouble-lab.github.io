import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/seo";
import { resumeHref } from "@/lib/assets";
import "./globals.css";
import "./studio.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.name}` },
  description: `${profile.name}, ${profile.role}. ${profile.intro}`,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body id="top"><a className="skip-link" href="#main">Aller au contenu</a><Header resume={resumeHref()} /><main id="main">{children}</main><Footer /></body></html>;
}
