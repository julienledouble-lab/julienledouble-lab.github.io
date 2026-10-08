export const profile = {
  name: "LEDOUBLE Julien",
  initials: "JL",
  role: "Product Builder · UX/UI · IA",
  headline: "Imaginer des produits. Les concrétiser.",
  intro: "Je conçois des produits numériques et connectés, de l’idée au prototype fonctionnel, en mêlant réflexion produit, UX/UI, IA et prototypage.",
  region: "Basé en Île-de-France",
  availability: "Ouvert aux opportunités en Product Builder, UX/UI et IA — alternance ou emploi",
  location: "Le Vésinet (78), Île-de-France",
  portrait: "/profile/portrait.webp",
  approach: "Je pars du besoin, définis le produit, ses fonctionnalités et ses parcours, puis j’utilise les outils d’IA pour accélérer le prototypage et l’implémentation. Je teste ensuite le résultat et j’itère jusqu’à obtenir une solution cohérente et fonctionnelle.",
  email: "julienledouble@gmail.com",
  phone: "06 26 48 18 01",
  phoneHref: "tel:+33626481801",
  linkedin: "https://linkedin.com/in/julien-ledouble",
  github: "https://github.com/julienledouble-lab",
  website: "https://julienledouble-lab.github.io/",
  // Activé automatiquement dès que public/cv.pdf existe (voir src/lib/assets.ts).
  resume: "/cv.pdf",
  education: { program: "Prépa Mastère Digital", school: "HETIC — Montreuil", since: "2025–2026" },
};

export const skills = [
  { number: "01", title: "Produit & UX/UI", description: "Partir du besoin, définir le produit et concevoir son expérience.", items: ["Figma", "Conception de parcours utilisateurs", "Définition de fonctionnalités", "Priorisation / MVP", "Prototypage", "Itération produit"] },
  { number: "02", title: "IA & prototypage", description: "Guider des agents de développement à partir de décisions produit claires.", items: ["Claude Code", "Codex", "Développement assisté par IA"] },
  { number: "03", title: "Applications & web", description: "Les technologies de mes prototypes, mobilisées avec l’assistance de l’IA.", items: ["Flutter — prototypage assisté par IA", "HTML / CSS — bases", "Supabase"] },
  { number: "04", title: "Objets & fabrication", description: "Fabriquer des prototypes connectés : électronique, intégration et boîtier.", items: ["ESP32 / prototypage électronique", "SolidWorks", "Impression 3D"] },
  { number: "05", title: "Notions complémentaires", description: "Des outils utilisés ponctuellement, à un niveau d’initiation.", items: ["Python — notions", "Blender — notions (3D visuelle)", "Git / GitHub — bases"] },
];

export const process = [
  { title: "Comprendre", text: "Partir du problème et de l’usage, écouter les besoins et identifier ce qui compte." },
  { title: "Définir", text: "Formuler le produit, ses fonctionnalités et prioriser un premier périmètre." },
  { title: "Concevoir", text: "Dessiner les parcours, les écrans et les interactions." },
  { title: "Construire", text: "Réaliser un prototype numérique ou physique, avec l’IA pour accélérer l’implémentation." },
  { title: "Tester", text: "Vérifier le résultat sur des cas concrets et repérer ce qui bloque." },
  { title: "Itérer", text: "Ajuster les choix produit jusqu’à une solution cohérente et fonctionnelle." },
];

export const journey = [
  { period: "2014–2015", phase: "Service & relation client", step: "Chauffeur VTC", note: "Le service au quotidien : ponctualité, relation client et qualité de l’expérience." },
  { period: "2015–2019", phase: "Entrepreneuriat", step: "Cofondateur & dirigeant — Altes‑Service", note: "Création et gestion d’un service de transport premium : organisation, équipe, clients et développement." },
  { period: "2020–2025", phase: "Multimédia", step: "Conseil multimédia & laboratoire photo — Auchan La Défense", note: "Conseil de vente, compréhension des besoins et responsabilité du laboratoire photo." },
  { period: "Depuis 2025", phase: "Reconversion", step: "Prépa Mastère Digital — HETIC", note: "UX/UI, réflexion produit et projets personnels, de l’idée au prototype." },
  { period: "Aujourd’hui", phase: "Produit", step: "Product Builder · UX/UI · IA", note: "À la recherche d’une alternance ou d’un emploi." },
];

export const about = [
  "Mon parcours n’a pas commencé dans le design ou la tech.",
  "J’ai d’abord travaillé dans le service et le transport, puis créé et dirigé une activité de transport premium avec Altes-Service. Cette expérience m’a appris à comprendre les besoins d’un client, organiser un service, prendre des décisions et transformer une idée en quelque chose de concret.",
  "J’ai ensuite passé plusieurs années dans la vente et le multimédia, avant de choisir de me reconvertir vers la conception de produits numériques.",
  "Aujourd’hui, je combine cette expérience terrain avec l’UX/UI, la réflexion produit, l’IA et le prototypage. Ce qui m’intéresse surtout : partir d’un problème, imaginer une solution cohérente et aller assez loin pour la rendre réellement utilisable.",
];

export const formations = {
  main: { period: "2025–2026", title: "Prépa Mastère Digital", school: "HETIC — Montreuil", note: "Conception de produits numériques, UX/UI et projets digitaux." },
  others: [
    { period: "2012", title: "BTS Assistance Technique d’Ingénieur", note: "Des bases techniques au service de la conception et du prototypage." },
    { period: "2010", title: "Bac professionnel Électrotechnique", note: "Le socle de mes projets électroniques, comme le Post-it intelligent.", minor: true },
  ],
};

export const strengths = [
  { title: "Relation client", text: "Du VTC au conseil multimédia : écouter, comprendre le besoin réel et soigner l’expérience." },
  { title: "Entreprendre & organiser", text: "Avec Altes-Service : structurer un service, recruter, coordonner une équipe et décider." },
  { title: "Produit & UX/UI", text: "Définir un produit, ses fonctionnalités et ses parcours, puis concevoir son expérience." },
  { title: "IA & prototypage", text: "Guider les outils d’IA pour passer de la décision produit à un prototype qui fonctionne." },
];
