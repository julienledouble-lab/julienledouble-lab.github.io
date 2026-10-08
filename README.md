# Portfolio — Product Builder · UX/UI · IA

Portfolio en français, construit avec Next.js App Router, TypeScript et Tailwind CSS, publié en site statique sur GitHub Pages : https://julienledouble-lab.github.io/. Aucun CMS, backend, formulaire fictif, outil de suivi ou bibliothèque d’animation n’est nécessaire.

## Démarrer

Prérequis : Node.js 20.9 minimum (Node.js 24 LTS conseillé) et npm.

```bash
npm ci
npm run dev
```

Ouvrir http://localhost:3000.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm run build` génère le site statique dans `out/` ; `npm start` sert ce dossier comme GitHub Pages (slash final, page 404). Arrêter le serveur de développement avant de lancer un autre serveur sur le même port.

### Tests navigateur

```bash
npm run build
npm test
```

Les tests servent le dossier `out/` sur le port 3100. Ils contrôlent les sept pages aux largeurs 320, 390, 768, 900, 1024 et 1440 px, le Hero, les contenus des études de cas, l’absence de TODO publics, les coordonnées, le CV conditionnel, le menu, le clavier, les liens, les routes 404, les assets SEO et l’accessibilité automatisée avec axe. Ils produisent également des captures dans `test-results/`.

Sous Windows, Chrome installé est utilisé par défaut. Sur Linux/macOS, installer Chromium avec `npx playwright install chromium`. La variable `PLAYWRIGHT_CHANNEL` permet de choisir un autre canal installé. L’audit automatisé ne remplace pas une évaluation complète avec des utilisateurs et technologies d’assistance.

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Positionnement, projets, compétences, méthode, outils et contact |
| `/projets/impulsion` | Étude de cas Impulsion |
| `/projets/post-it-intelligent` | Étude de cas objet physique + logiciel |
| `/projets/sport-alimentation` | Étude de cas application Flutter |
| `/a-propos` | Parcours, timeline, formation et fil conducteur |
| `/competences` | Compétences et technologies réellement citées |
| `/contact` | Email, téléphone, LinkedIn, GitHub et CV (si `public/cv.pdf` existe) |

## Modifier le contenu

### Identité et liens

Modifier `src/data/profile.ts` : `name`, `initials`, `email`, `phone`, `linkedin`, `github`, formation et disponibilité.

CV : le PDF publié est `public/cv.pdf` ; pour le mettre à jour, remplacer ce fichier puis relancer `npm run build`. Une version HTML alternative existe dans `cv/cv.html` (`npm run cv` la convertit en `cv/cv-genere.pdf`, sans toucher au CV publié). Les liens « CV » (navigation, contact, CTA final) apparaissent automatiquement dès que le fichier existe (`src/lib/assets.ts`) ; tant qu’il manque, aucun lien cassé n’est affiché.

Les textes de présentation et les étapes du parcours se trouvent dans `src/data/profile.ts`. Les données des compétences et du processus sont dans `src/data/profile.ts`.

### Études de cas

Modifier `src/data/projects.ts`. Chaque projet contient :

- `slug` : adresse du projet ; conserver le slug si l’URL a déjà été partagée.
- `title`, `tagline`, `description`, `role`, `status`, `tags` : présentation synthétique (cartes et Hero).
- `facts` : résumé rapide affiché sous le titre de l’étude de cas.
- `showcase` : maquettes affichées dans le Hero de l’étude de cas (sinon visuel conceptuel).
- `sections` : sections de l’étude de cas, avec identifiants pour le sommaire. Chaque section peut contenir `paragraphs`, `items`, `steps` (parcours numéroté), `pillars` (cartes), `status` (état réel : `ok`, `wip`, `later`, `lab`), `chapters` (chapitres visuels avec écrans) et `note`.
- `cover` et `coverAlt` : chemin public de la couverture et description accessible.
- `gallery` : photos ou captures réelles ; la section « Visuels » n’apparaît que si la liste est remplie.
- `prototypeUrl` : lien vers une démonstration ou vidéo publique.

Les informations manquantes ne sont jamais affichées publiquement : elles sont suivies dans un fichier interne (`ASSETS_NEEDED.md`), non versionné.

Exemple d’ajout d’images :

```ts
cover: "/projects/impulsion/cover.webp",
coverAlt: "Accueil réel du prototype Impulsion",
gallery: [
  {
    src: "/projects/impulsion/mobile.webp",
    alt: "Description de ce qui est réellement affiché",
    caption: "Contexte et version du prototype.",
    width: 1600,
    height: 1000,
  },
],
```

La couverture utilise un recadrage `object-cover`. Pour une capture qui doit rester entière, utiliser la galerie ou adapter `.actual-visual` dans `src/app/globals.css`. Utiliser des fichiers locaux ; les domaines d’images distants ne sont volontairement pas configurés.

Ne pas transformer une hypothèse ou un objectif en résultat mesuré. Les originaux lourds (PNG des maquettes, portrait d’origine) sont conservés en local dans `assets-src/`, non versionné ; les versions publiées sont en WebP dans `public/`.

### Design

- `src/app/globals.css` : couleurs, typographie, compositions, breakpoints et animations.
- `src/app/studio.css` : direction visuelle actuelle (fond bleu nuit `#151E2D`, texte clair, accents bleu pâle, accueil asymétrique et fiches projets alternées). Ce fichier est chargé après les styles de base. Les couleurs du thème se règlent dans `:root` et le bloc « Palette bleu nuit ».
- `src/components/project-visual.tsx` : compositions abstraites servant de placeholders.
- `src/components/header.tsx` : navigation responsive, gestion du menu et de la touche Échap.
- `src/components/sections.tsx` : blocs partagés.

Les polices système évitent une dépendance réseau et tout téléchargement de police. Le site respecte `prefers-reduced-motion`, dispose d’un lien d’évitement et de focus clavier visibles.

## SEO

Les pages possèdent un titre, une description et des metadata OpenGraph/Twitter. `src/app/opengraph-image.png` est l’image de partage. `src/app/icon.svg` est le favicon provisoire.

L’URL publique est définie par `NEXT_PUBLIC_SITE_URL` (URL absolue HTTPS, sans slash final). Le workflow GitHub Pages la renseigne avec `https://julienledouble-lab.github.io` : URLs canoniques, sitemap et indexation sont alors actifs. Sans cette variable (en local, par exemple), le site demande aux robots de ne pas l’indexer et le sitemap reste vide.

## Déployer sur GitHub Pages

Le site est publié par la GitHub Action `.github/workflows/deploy.yml` à chaque push sur `main` : installation, lint, typecheck, export statique (`out/`), puis publication sur GitHub Pages (source « GitHub Actions » dans les réglages Pages du dépôt).

Avant de pousser :

1. Remplacer `public/cv.pdf` si le CV a changé.
2. `npm run lint`, `npm run typecheck`, `npm run build`, puis `npm test`.
3. Pousser sur `main` et suivre le déploiement dans l’onglet **Actions**.

Le site étant statique (`output: "export"`), l’optimiseur d’images de Next.js n’est pas utilisé : les images de `public/` sont déjà en WebP à la bonne taille.

## Documents internes

Les documents de travail (`ASSETS_NEEDED.md`, `docs/`, instructions pour agents `AGENTS.md` / `CLAUDE.md`) et les originaux de `assets-src/` restent en local : ils sont exclus du dépôt par `.gitignore` et ne sont jamais affichés sur le site.
