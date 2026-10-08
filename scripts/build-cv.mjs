// Génère cv/cv-genere.pdf à partir de cv/cv.html (une page A4).
// Le CV publié est public/cv.pdf, fourni à part : ce script ne l’écrase pas.
import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === "win32" ? "chrome" : undefined) });
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve("cv/cv.html")).href, { waitUntil: "networkidle" });
const overflow = await page.evaluate(() => { const p = document.querySelector(".page"); return p.scrollHeight - p.clientHeight; });
if (overflow > 0) console.warn(`Attention : le contenu dépasse la page A4 de ${overflow}px.`);
await page.pdf({ path: "cv/cv-genere.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("cv/cv-genere.pdf généré (copier dans public/cv.pdf pour le publier).");
