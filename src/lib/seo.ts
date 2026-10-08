import type { Metadata } from "next";
import { profile } from "@/data/profile";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
// URL publique d’une page, avec slash final (export statique en trailingSlash).
export const pageUrl = (path: string) => `${siteUrl}${path.endsWith("/") ? path : `${path}/`}`;
// `home` : titre complet sans gabarit, pour que le nom apparaisse en premier.
export function pageMetadata(title: string, description: string, path: string, home = false): Metadata {
  const full = home ? `${profile.name} — ${title}` : `${title} — ${profile.name}`;
  return {
    title: home ? { absolute: full } : title, description,
    ...(siteUrl ? { alternates: { canonical: pageUrl(path) } } : {}),
    openGraph: { title: full, siteName: `${profile.name} — Portfolio`, description, type: "website", locale: "fr_FR", ...(siteUrl ? { url: pageUrl(path) } : {}), images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: profile.role }] },
    twitter: { card: "summary_large_image", title: full, description, images: ["/opengraph-image.png"] },
  };
}
