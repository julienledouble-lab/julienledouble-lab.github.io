import type { NextConfig } from "next";
// Export statique (dossier out/) publié sur GitHub Pages : pas de serveur, donc pas d'optimiseur d'images.
// Les images de public/ sont déjà en WebP, à la bonne taille.
// trailingSlash : chaque page devient dossier/index.html, servi sans ambiguïté par GitHub Pages.
const nextConfig: NextConfig = { output: "export", trailingSlash: true, poweredByHeader: false, turbopack: { root: process.cwd() }, images: { unoptimized: true } };
export default nextConfig;
