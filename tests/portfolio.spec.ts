import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";

const routes = ["/", "/a-propos", "/competences", "/contact", "/projets/impulsion", "/projets/post-it-intelligent", "/projets/sport-alimentation"];

for (const width of [320, 390, 768, 900, 1024, 1440]) {
  test(`Toutes les pages restent lisibles sans débordement à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.locator("html").getAttribute("lang")).toBe("fr");
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      expect(dimensions.content, `Débordement sur ${route}`).toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
}

test("Les liens internes et les ancres pointent vers des destinations existantes", async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const links = await page.locator("a[href]").evaluateAll(elements => elements.map(element => (element as HTMLAnchorElement).href));
    for (const link of links) {
      const url = new URL(link);
      if (url.origin !== "http://127.0.0.1:3100") continue;
      expect(url.pathname === "/" && url.hash === "#", "Lien placeholder interdit").toBe(false);
      destinations.add(url.pathname);
      if (url.hash && url.pathname.replace(/\/$/, "") === route.replace(/\/$/, "")) {
        await expect(page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`)).toHaveCount(1);
      }
    }
  }
  for (const path of destinations) expect((await request.get(path)).status(), path).toBe(200);
});

test("Le menu mobile s’ouvre, se ferme avec Échap et navigue", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu" });
  await button.click();
  await expect(page.getByRole("navigation", { name: "Navigation principale" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
  await button.click();
  await page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "À propos" }).click();
  await expect(page).toHaveURL(/\/a-propos\/$/);
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("Le clavier accède au contenu et les projets s’ouvrent", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.getByRole("link", { name: /01.*APPLICATION MOBILE/ }).click();
  await expect(page).toHaveURL(/projets\/impulsion\/$/);
  // La liste « Informations à compléter » n'est plus publique : le sommaire mène aux écrans.
  await page.getByRole("navigation", { name: "Sommaire du projet" }).getByRole("link", { name: "Les écrans" }).click();
  await expect(page).toHaveURL(/#ecrans$/);
  await expect(page.getByRole("heading", { name: "Rencontrer et collaborer" })).toBeVisible();
});

for (const width of [390, 1440]) {
  test(`Accessibilité automatisée WCAG 2.1 AA à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    for (const route of routes) {
      await page.goto(route);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations, `${route}: ${JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })))}`).toEqual([]);
    }
  });
}

test("Les pages inconnues renvoient 404 et les assets SEO sont disponibles", async ({ request }) => {
  expect((await request.get("/projets/inconnu")).status()).toBe(404);
  expect((await request.get("/inconnu")).status()).toBe(404);
  for (const path of ["/icon.svg", "/opengraph-image.png", "/robots.txt", "/sitemap.xml"]) expect((await request.get(path)).status(), path).toBe(200);
  const og = await request.get("/opengraph-image.png");
  expect(og.headers()["content-type"]).toContain("image/png");
});

test("Les coordonnées sont réelles et le CV n’apparaît que si le PDF existe", async ({ page, request }) => {
  const hasResume = existsSync("public/cv.pdf");
  await page.goto("/contact");
  await expect(page.locator(".contact-link")).toHaveCount(hasResume ? 5 : 4);
  await expect(page.locator(".contact-links a[href='mailto:julienledouble@gmail.com']")).toHaveCount(1);
  await expect(page.locator(".contact-links a[href='tel:+33626481801']")).toContainText("06 26 48 18 01");
  await expect(page.locator(".contact-links a[href='https://linkedin.com/in/julien-ledouble']")).toHaveCount(1);
  await expect(page.locator(".contact-links a[href='https://github.com/julienledouble-lab']")).toHaveCount(1);
  await expect(page.locator('a[href=""], a[href="#"], a[href="mailto:"]')).toHaveCount(0);
  for (const route of ["/", "/contact"]) {
    await page.goto(route);
    await expect(page.locator('a[href="/cv.pdf"]').first()).toHaveCount(hasResume ? 1 : 0);
  }
  if (hasResume) expect((await request.get("/cv.pdf")).status()).toBe(200);
  await page.goto("/");
  await expect(page.locator(".contact-banner")).toContainText("julienledouble@gmail.com");
  await expect(page.locator(".contact-banner")).toContainText("06 26 48 18 01");
});

test("Les animations respectent la préférence de réduction des mouvements", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  // La vidéo Corps 3D ne se lance pas toute seule : seule son image d'aperçu est affichée.
  await page.goto("/projets/sport-alimentation");
  const video = page.locator("#corps-3d video");
  await video.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  expect(await video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  await page.goto("/");
  for (const card of await page.locator(".floating-project").all()) {
    expect(await card.evaluate(element => getComputedStyle(element).transitionDuration)).toBe("0s");
    expect(await card.evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  }
});

test("Captures de contrôle desktop et mobile", async ({ page }, testInfo) => {
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.screenshot({ path: testInfo.outputPath(`accueil-${width}.png`), fullPage: true, animations: "disabled" });
  }
  await page.goto("/projets/impulsion");
  await page.screenshot({ path: testInfo.outputPath("projet-mobile.png"), fullPage: true, animations: "disabled" });
});

test("Le Hero présente le produit, le portrait et les trois accès projets", async ({ page }) => {
  for (const width of [390, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Imaginer des produits.Les concrétiser.");
    await expect(page.locator(".hero-role, .studio-name")).toHaveCount(0);
    await expect(page.locator(".brand-caption")).toHaveText("JulienLEDOUBLE");
    await expect(page.locator(".hero-location")).toHaveText("Basé en Île-de-France · Ouvert aux opportunités en Product Builder, UX/UI et IA — alternance ou emploi");
    await expect(page.locator(".hero-actions").getByRole("link", { name: "Voir mes projets" })).toHaveAttribute("href", "#projets");
    const portrait = await page.locator(".portrait-frame").boundingBox();
    expect(portrait).not.toBeNull();
    expect(portrait!.y).toBeLessThan(800);
    expect(portrait!.width).toBeGreaterThan(200);
    await expect(page.locator(".portrait-frame").getByRole("img")).toBeVisible();
    // Zone du visage centrée dans le cadre : 30 % à 70 % en largeur, 12 % à 55 % en hauteur.
    const face = { x: portrait!.x + portrait!.width * .3, y: portrait!.y + portrait!.height * .12, width: portrait!.width * .4, height: portrait!.height * .43 };
    for (const link of await page.locator(".floating-project").all()) {
      const box = (await link.boundingBox())!;
      const intersectsFace = box.x < face.x + face.width && box.x + box.width > face.x && box.y < face.y + face.height && box.y + box.height > face.y;
      expect(intersectsFace, "Un aperçu recouvre la zone du visage").toBe(false);
      await link.click();
      await expect(page).toHaveURL(/projets\//);
      await page.goto("/");
    }
  }
});

test("Le positionnement et les études de cas restent cohérents", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(/AI Product Builder Junior|Je ne code pas|opportunité junior|poste junior|stage|Prénom Nom/i);
    // Aucune checklist interne visible par un recruteur.
    await expect(page.locator("body")).not.toContainText(/TODO|reste à documenter|sera ajouté|reste à préciser|à compléter|à renseigner|captures à venir|captures de l’application/i);
  }
  await page.goto("/projets/impulsion");
  await expect(page.locator("#en-bref")).toContainText("professionnels de l’industrie musicale");
  // Accord de Geoffrey Giovetti donné : son nom est affiché, la collaboration reste explicite.
  await expect(page.locator("#role")).toContainText("Projet co-conçu avec Geoffrey Giovetti. J’ai initié le concept d’Impulsion, puis nous avons travaillé ensemble sur le produit, les parcours, les maquettes, le prototype et le développement.");
  await expect(page.locator(".case-summary")).toContainText("Cofondateur · Product Builder");
  await expect(page.locator("body")).not.toContainText("mon associé");
  await expect(page.locator("body")).not.toContainText("Flutter");
  await expect(page.locator("#stack")).toContainText("React Native · Expo · Supabase · Claude Code · Codex");
  await expect(page.locator("#stack")).toContainText("Figma et Claude Design");
  await expect(page.locator("#etude")).toContainText("33 premières réponses");
  await expect(page.locator("#etude")).toContainText("pas encore été diffusés");
  await expect(page.locator("#ecrans")).toContainText("Maquettes haute fidélité — direction V3");
  await expect(page.locator("#etat")).toContainText("Les tests utilisateurs structurés viendront après consolidation de l’étude de marché.");
  await expect(page.locator("#methode")).toContainText("Implémentation assistée par IA avec Claude Code et Codex");
  await expect(page.locator("#apprentissages h2")).toHaveText("Ce que j’ai appris");
  await expect(page.locator("#apprentissages p")).toHaveCount(3);
  await expect(page.locator("#apprentissages")).toContainText("Impulsion m’a appris à ne pas figer trop tôt une solution.");
  await expect(page.locator("details")).toHaveCount(0);
  for (const [chapter, files] of [["rencontrer", ["match", "conversation"]], ["projet", ["projets", "projet-detail"]], ["pros", ["pros", "agenda-pro"]]] as const) {
    const images = page.locator(`#${chapter} .chapter-screens img`);
    await expect(images).toHaveCount(2);
    for (const [i, file] of files.entries()) expect(await images.nth(i).getAttribute("src")).toContain(`${file}.webp`);
  }
  await expect(page.locator("#pros")).toContainText("n’est pas encore développé dans l’application");
  await page.goto("/projets/post-it-intelligent");
  // Firmware audité : pas de reconnaissance vocale active, pas de buzzer, météo à connecter.
  await expect(page.locator("body")).not.toContainText("La reconnaissance vocale est réalisée localement");
  await expect(page.locator("#solution")).toContainText("la source de données réelle reste à connecter dans la configuration actuelle");
  await expect(page.locator("#solution li")).toHaveCount(7);
  await expect(page.locator("#etat")).toContainText("La branche principale compile et fonctionne");
  // La batterie et le panneau sont câblés (schéma électrique) mais non gérés par le firmware :
  // ils ne doivent jamais apparaître comme « Fonctionnel », et le buzzer nulle part dans l'état actuel.
  await expect(page.locator("#etat")).not.toContainText(/buzzer/i);
  // Le réveil vocal est en cours de développement, jamais présenté comme fonctionnel.
  await expect(page.locator("#etat .status-wip").filter({ hasText: "Réveil par commande vocale" })).toHaveCount(1);
  for (const text of await page.locator("#etat .status-ok").allTextContents()) expect(text).not.toMatch(/vocal/i);
  // Le schéma montre un micro et un buzzer : ils doivent rester présentés comme non exploités par le firmware.
  await expect(page.locator("#fabrication")).toContainText("ne sont pas encore exploités par le firmware actuel");
  for (const text of await page.locator("#etat .status-ok").allTextContents()) expect(text).not.toMatch(/batterie|solaire/i);
  await expect(page.locator("#etat .status-lab").filter({ hasText: /batterie/i })).toContainText("non gérés par le firmware");
  await expect(page.locator("#evolutions")).toContainText("Architecture vocale préparée et simulable : le micro est implanté, mais la reconnaissance vocale réelle reste à intégrer au firmware.");
  await expect(page.locator("#evolutions")).toContainText(/Cooking Mode [—-] expérimentation en cours/);
  await expect(page.locator("#fabrication")).toContainText("expérimentation matérielle menée en parallèle du firmware actuel");
  // Visuels réels : photos avant / arrière en tête, vue éclatée et schéma dans la fabrication.
  await expect(page.locator(".showcase-photos img")).toHaveCount(2);
  await expect(page.locator("#fabrication .photo-gallery img")).toHaveCount(2);
  for (const img of await page.locator(".showcase-photos img, #fabrication img").all()) {
    expect((await img.getAttribute("alt"))?.length ?? 0).toBeGreaterThan(30);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator(".placeholder-label")).toHaveCount(0);
  // La photo réelle remplace aussi le visuel conceptuel du Post-it à l'accueil (carte et aperçu du Hero).
  await page.goto("/");
  const postitPhotos = page.locator('a[href="/projets/post-it-intelligent/"] img[src*="prototype-avant"]');
  await expect(postitPhotos).toHaveCount(2);
  for (const img of await postitPhotos.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.goto("/projets/sport-alimentation");
  await expect(page.locator("h1")).toHaveText("PMF – Sport et alimentation.");
  await expect(page.locator("#etat")).toContainText("pas encore de backend applicatif ni d’authentification");
  await expect(page.locator("#ia")).toContainText("Une IA (Gemini) adapte les exercices et l’alimentation");
  await expect(page.locator("#nutrition")).toContainText("Caddely est une autre application que je développe");
  // Animation 3D des exercices : en cours, jamais « Fonctionnel ».
  await expect(page.locator("#fonctionnalites .status-wip").filter({ hasText: "Exercices animés sur le modèle 3D" })).toHaveCount(1);
  for (const text of await page.locator("#fonctionnalites .status-ok").allTextContents()) expect(text).not.toMatch(/animé/i);
  // Vidéo Corps 3D : lecture automatique en boucle, muette, sans contrôles ; pause au clic.
  const video = page.locator("#corps-3d video");
  expect(await video.getAttribute("controls")).toBeNull();
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("loop", true);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(false);
  await video.click();
  await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true);
  for (const path of ["/projects/sport-alimentation/corps-3d.mp4", "/projects/sport-alimentation/corps-3d-poster.webp"]) expect((await page.request.get(path)).status(), path).toBe(200);
  // La personnalisation alimentaire est présentée une seule fois, avec les captures du chapitre nutrition.
  await expect(page.locator("#nutrition")).toContainText("Plan alimentaire sur 7 jours avec possibilité de remplacer un repas");
  await expect(page.locator("#personnalisation")).toHaveCount(0);
  // Écrans recréés à partir du prototype : jamais présentés comme « captures », UI en cours d’itération.
  await expect(page.locator(".case-showcase figcaption")).toHaveText("ÉCRANS DU PROTOTYPE · UI EN COURS D’ITÉRATION");
  await expect(page.locator("#ecrans")).toContainText("Écrans issus du prototype fonctionnel.");
  await expect(page.locator("#ecrans")).toContainText("la direction UI continue d’évoluer");
  await expect(page.locator("body")).not.toContainText(/captures? (réelles|du prototype)|interface non designée|travail de design/i);
  for (const alt of await page.locator("img").evaluateAll(els => els.map(el => el.getAttribute("alt") ?? ""))) expect(alt).not.toMatch(/^Capture/);
  // Relais Gemini : aucune promesse de confidentialité non prouvée ; recettes externes en cours d’intégration.
  await expect(page.locator("#ia")).toContainText("Les échanges avec Gemini passent par un relais serverless qui garde la clé API côté serveur.");
  await expect(page.locator("body")).not.toContainText(/ne conserve aucune|aucun log/i);
  await expect(page.locator("#fonctionnalites .status-wip").filter({ hasText: "Sélection de recettes adaptées" })).toHaveCount(1);
  await expect(page.locator(".case-showcase img")).toHaveCount(3);
  for (const chapter of ["entrainement", "nutrition", "quotidien"]) await expect(page.locator(`#${chapter} .chapter-screens img`)).toHaveCount(2);
  for (const img of await page.locator(".case-showcase img, #ecrans img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator("#visuels")).toHaveCount(0);
  await page.goto("/a-propos");
  await expect(page.locator(".journey li")).toHaveCount(5);
  // HETIC n’est plus répété dans le bloc de faits ; la période reste cohérente avec la timeline.
  await expect(page.locator(".about-facts")).toContainText("POSITIONNEMENT");
  await expect(page.locator(".about-facts")).not.toContainText("HETIC");
  await expect(page.locator("body")).not.toContainText("octobre 2025");
  // Accueil : formulation juste sur l’IA (projet collaboratif, pas de campagne de tests revendiquée).
  await page.goto("/");
  await expect(page.locator(".builder-manifesto")).toContainText("J’utilise Claude Code et Codex pour accélérer l’implémentation,tout en gardant la maîtrise des choix produit et de la validation.");
  await expect(page.locator("body")).not.toContainText(/restent les miens|tout est fait par l’IA/i);
  // Le lien « À propos » du header ouvre la vraie page, sur desktop.
  await expect(page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "À propos" })).toHaveAttribute("href", "/a-propos/");
});
