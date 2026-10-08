import type { MetadataRoute } from "next";
import { pageUrl, siteUrl } from "@/lib/seo";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return siteUrl ? ["/", "/a-propos", "/competences", "/contact", ...projects.map(p => `/projets/${p.slug}`)].map(path => ({ url: pageUrl(path) })) : []; }
