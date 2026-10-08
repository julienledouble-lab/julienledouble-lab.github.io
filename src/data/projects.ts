export type Screen = { src: string; alt: string; caption: string; width: number; height: number };
export type Status = { label: string; state: "ok" | "wip" | "later" | "lab" };
// Vidéo courte, sans son : lue à la demande (pas de lecture automatique).
export type Video = { src: string; poster: string; label: string; caption: string };
export type Chapter = { id: string; letter: string; title: string; text: string; points: string[]; screens: Screen[]; video?: Video; note?: string };
export type ProjectSection = {
  id: string; title: string;
  paragraphs?: string[];
  items?: string[];
  steps?: string[];
  pillars?: { label: string; text: string }[];
  status?: Status[];
  chapters?: Chapter[];
  // Photos ou schémas affichés dans la section, ouvrables en taille réelle.
  figures?: Screen[];
  note?: string;
};
export type Project = {
  slug: string; number: string; title: string; category: string; theme: "impulsion" | "paper" | "sport";
  tagline: string; description: string; tags: string[]; status: string; role: string;
  facts: { label: string; value: string }[];
  cover: string; coverAlt: string;
  // Cadrage de la couverture dans les cartes (object-position CSS).
  coverPosition?: string;
  // Visuels affichés dans le Hero de l'étude de cas, à la place du visuel conceptuel.
  showcase?: Screen[];
  showcaseCaption?: string;
  showcaseStyle?: "phones" | "photos";
  // Visuels réels (photos, captures) : la section n'est affichée que si la liste est remplie.
  gallery: Screen[];
  prototypeUrl: string; sections: ProjectSection[];
};

const screen = (name: string, alt: string, caption: string): Screen => ({ src: `/projects/impulsion/${name}.webp`, alt, caption, width: 863, height: 1822 });

const postit = (name: string, width: number, height: number, alt: string, caption: string): Screen => ({ src: `/projects/post-it-intelligent/${name}.webp`, alt, caption, width, height });

const postitVisuals = {
  front: postit("prototype-avant", 1122, 1402, "Face avant du prototype de Post-it intelligent : boîtier noir imprimé en 3D, écran e-paper affichant la page Météo (1/7) et panneau solaire intégré", "Face avant : écran e-paper (page Météo, valeurs de démonstration) et panneau solaire."),
  back: postit("prototype-arriere", 1122, 1402, "Face arrière du boîtier imprimé en 3D, fermée par quatre vis, avec une grille perforée", "Face arrière : boîtier imprimé en 3D, fermé par quatre vis."),
  exploded: postit("vue-eclatee-solidworks", 1087, 761, "Vue éclatée SolidWorks du boîtier : plaque arrière avec supports internes, coque avec fenêtres pour l’écran et le panneau solaire, cadre du panneau et petites pièces de fixation", "Vue éclatée du boîtier, modélisé sous SolidWorks."),
  schematic: postit("architecture-electronique-v5", 1448, 1086, "Architecture électronique : panneau solaire et batterie LiPo 3,7 V reliés au chargeur BQ25185 (charge et boost 5 V), qui alimente la carte LILYGO T5 V2.3.1 (ESP32) avec son écran e-paper 2,13 pouces intégré ; micro INMP441 en I2S (GPIO19, 21, 22) et buzzer sur GPIO27, implantés dans le prototype mais pas encore exploités par le firmware", "Architecture électronique : alimentation solaire et batterie, carte LILYGO T5 et écran e-paper intégré. Le micro I2S et le buzzer sont implantés dans le prototype, mais pas encore exploités par le firmware."),
};

// Écrans du prototype (application « PMF »), recréés à partir du prototype fonctionnel.
const sport = (name: string, alt: string, caption: string): Screen => ({ src: `/projects/sport-alimentation/${name}.webp`, alt, caption, width: 863, height: 1822 });

const sportScreens = {
  mission: sport("mission-du-jour", "Écran Mission du jour : séance de 3 mouvements sans impact, adaptée pour protéger le genou et limitée au matériel du lieu sélectionné, avec un bouton Démarrer la séance", "Mission du jour : une séance adaptée aux contraintes et au matériel disponible."),
  session: sport("seance-en-cours", "Écran de séance en cours : exercice Marche sur place démontré par un personnage 3D, minuteur de 22 secondes et boutons Pause, Donner mon ressenti et Passer au suivant", "Séance guidée : exercice animé en 3D, minuteur et ressenti."),
  plan: sport("plan-alimentaire", "Écran du plan alimentaire du lundi : petit-déjeuner avec photo, ingrédients, temps, calories et protéines, boutons Valider le repas, Passer, Remplacer et J’ai faim, puis liste de courses Caddely et préférences alimentaires", "Plan du jour : valider, passer ou remplacer un repas."),
  hungry: sport("plan-jai-faim", "Écran du plan alimentaire du mardi : bouton J’ai faim, recette du petit-déjeuner, envoi des ingrédients de la semaine vers Caddely et aliments à éviter", "« J’ai faim », recettes et envoi des ingrédients vers Caddely."),
  inventory: sport("inventaire-materiel", "Écran d’inventaire du lieu Extérieur : liste de matériel à cocher (haltères, élastique, tapis, kettlebell, barre, banc, poulie, barre de traction, machine cardio) et bouton Ajouter une photo de matériel", "Inventaire du matériel par lieu, avec ajout par photo."),
  profile: sport("profil", "Écran Profil : lieu actif, matériel, mode sombre, ton des encouragements (doux, motivant ou cash), contraintes, profil nutritionnel et données locales", "Profil : lieu, matériel, ton des encouragements et données locales."),
};

const impulsionScreens = {
  match: screen("match", "Maquette « Même impulsion » : deux musiciens se sont choisis mutuellement et échangent leurs premiers messages", "« Même impulsion » : la découverte est réciproque."),
  conversation: screen("conversation", "Maquette de conversation entre deux musiciens, avec une invitation à rejoindre le projet Quartet Rhône", "La conversation peut mener à une invitation dans un projet."),
  projets: screen("projets", "Maquette de l’écran Projets : invitation reçue, candidatures, projets en cours avec places ouvertes et projets suggérés", "Mes projets, places ouvertes et projets suggérés."),
  projetDetail: screen("projet-detail", "Maquette du détail du projet Quartet Rhône : candidatures reçues, besoins par instrument et profils suggérés à inviter", "Besoins par instrument, candidatures et profils suggérés."),
  pros: screen("pros", "Maquette de l’écran Me faire connaître des pros : dossier artiste, professionnels correspondants, demandes envoyées et visibilité", "Côté artiste : dossier et professionnels correspondants."),
  agenda: screen("agenda-pro", "Maquette de l’agenda de l’espace professionnel : rendez-vous de la semaine, demandes en attente et créneaux libres", "Côté professionnel : agenda et prise de rendez-vous."),
};

// Le nom de l'associé n'est affiché publiquement qu'avec son accord (accord donné).
const impulsionPartner = { name: "Geoffrey Giovetti", publicNameApproved: true };
const partner = impulsionPartner.publicNameApproved ? impulsionPartner.name : "mon associé";

export const projects: Project[] = [
  {
    slug: "impulsion", number: "01", title: "Impulsion", category: "APPLICATION MOBILE · MUSIQUE", theme: "impulsion",
    tagline: "Aider les artistes à se rencontrer, collaborer, construire des projets et se connecter aux professionnels de la musique.",
    description: "Une plateforme pensée pour aider les artistes à se rencontrer, trouver des partenaires compatibles, créer des projets et développer leur réseau jusqu’aux professionnels de l’industrie musicale.",
    tags: ["Cofondateur", "Product Builder", "UX/UI", "IA"], status: "Prototype mobile fonctionnel · V1 en cours de définition",
    role: "Cofondateur · Product Builder",
    facts: [
      { label: "MON RÔLE", value: "Cofondateur · Product Builder" },
      { label: "EN DUO", value: `Co-conçu avec ${partner}` },
      { label: "ÉTAT", value: "Prototype mobile fonctionnel · V1 en cours de définition" },
      { label: "STACK", value: "React Native · Expo · Supabase · Claude Code · Codex" },
      { label: "MAQUETTES", value: "Figma · Claude Design" },
    ],
    cover: "/projects/impulsion/cover-logo-maquettes.webp", coverAlt: "Logo d’Impulsion (un médiator contenant une onde sonore) entre deux maquettes haute fidélité : écran « Même impulsion » entre deux musiciens et liste des projets",
    showcase: [impulsionScreens.match, impulsionScreens.projetDetail, impulsionScreens.pros],
    showcaseCaption: "MAQUETTES HAUTE FIDÉLITÉ — DIRECTION V3",
    gallery: [], prototypeUrl: "",
    sections: [
      { id: "en-bref", title: "En bref", paragraphs: ["Impulsion est une plateforme pensée pour aider les artistes à se rencontrer, trouver des partenaires compatibles, créer des projets et développer leur réseau jusqu’aux professionnels de l’industrie musicale."], steps: ["Rencontrer", "Collaborer", "Construire un projet", "Se connecter aux pros"] },
      { id: "role", title: "Mon rôle", paragraphs: [`Projet co-conçu avec ${partner}. J’ai initié le concept d’Impulsion, puis nous avons travaillé ensemble sur le produit, les parcours, les maquettes, le prototype et le développement.`], items: ["Mon point de départ : l’idée initiale et l’identification du problème", "Ensemble : concept, cibles, étude de marché, fonctionnalités, MVP, parcours, maquettes, design system, microcopy et prototype", "Pilotage partagé, présentations extérieures et démarches de création d’entreprise menées à deux", `Conçus principalement par ${partner} : les nouveaux questionnaires et l’agenda / prise de rendez-vous`] },
      { id: "probleme", title: "Le problème", paragraphs: ["Sans réseau établi, un artiste peut difficilement trouver avec qui jouer, monter un projet et se faire connaître des professionnels de l’industrie musicale. Impulsion part de ce constat, d’abord identifié de mon côté, puis approfondi à deux avec une recherche concurrentielle et une première étude de marché."] },
      { id: "etude", title: "Ce que l’étude nous a appris", paragraphs: ["Les 33 premières réponses ont surtout fait ressortir trois difficultés : gagner en visibilité, trouver des partenaires compatibles et développer son réseau. Des échanges avec des artistes et un premier rendez-vous avec un professionnel ont complété ces retours."], pillars: [
        { label: "Visibilité", text: "Se faire remarquer quand on débute ou que l’on change de projet." },
        { label: "Partenaires compatibles", text: "Style musical, niveau, objectifs, disponibilités, localisation, façon de travailler." },
        { label: "Réseau", text: "Accéder aux bonnes personnes, jusqu’aux professionnels de la musique." },
      ], note: "Deux nouveaux questionnaires, l’un pour les artistes et l’autre pour les professionnels, sont en préparation. Ils n’ont pas encore été diffusés et ne font pas partie de ces 33 réponses." },
      { id: "reponse", title: "La réponse produit", paragraphs: ["Le produit suit la progression d’un artiste, de la première rencontre jusqu’aux professionnels."], pillars: [
        { label: "01 · Rencontrer", text: "Des profils et des recommandations pour trouver des artistes compatibles." },
        { label: "02 · Collaborer", text: "Une mise en relation réciproque, puis une vraie conversation." },
        { label: "03 · Construire un projet", text: "Créer ou rejoindre un projet, ouvrir des places et constituer une équipe." },
        { label: "04 · Se connecter aux pros", text: "Un dossier artiste pour aller vers les professionnels. En conception." },
      ] },
      { id: "ecrans", title: "Les écrans", paragraphs: ["Maquettes haute fidélité — direction V3. Certaines fonctionnalités sont déjà présentes dans le prototype fonctionnel ; l’espace professionnel reste en cours de conception et d’intégration."], chapters: [
        { id: "rencontrer", letter: "A", title: "Rencontrer et collaborer", text: "Deux artistes se découvrent et se choisissent mutuellement. La découverte devient une vraie conversation, qui peut déboucher sur une collaboration.", points: ["Découverte mutuelle", "« Même impulsion » quand l’intérêt est réciproque", "De la conversation à l’invitation dans un projet"], screens: [impulsionScreens.match, impulsionScreens.conversation] },
        { id: "projet", letter: "B", title: "Créer un projet", text: "Un projet rassemble une équipe autour de besoins précis : chaque place ouverte peut recevoir des candidatures ou être proposée à des profils suggérés.", points: ["Création ou découverte de projets", "Places à pourvoir et gestion des besoins", "Profils suggérés et candidatures", "Constitution de l’équipe"], screens: [impulsionScreens.projets, impulsionScreens.projetDetail] },
        { id: "pros", letter: "C", title: "Se connecter aux professionnels", text: "L’artiste constitue un dossier, découvre des professionnels qui lui correspondent et peut les contacter. Côté professionnel, l’agenda prolonge la mise en relation jusqu’à la prise de rendez-vous.", points: ["Constitution d’un dossier artiste", "Découverte et contact de professionnels", "Prolongement possible jusqu’au rendez-vous"], screens: [impulsionScreens.pros, impulsionScreens.agenda], note: "Direction de conception : l’espace professionnel est en cours de conception et d’intégration. Ce parcours n’est pas encore développé dans l’application." },
      ] },
      { id: "etat", title: "État actuel du prototype", paragraphs: ["Impulsion possède un prototype mobile fonctionnel. Il reste une ébauche : l’étude de marché se poursuit et la V1 n’est pas encore figée."], status: [
        { label: "Prototype mobile", state: "ok" },
        { label: "Authentification", state: "ok" },
        { label: "Backend et base de données Supabase", state: "ok" },
        { label: "Profils artistes", state: "ok" },
        { label: "Matching et recommandations entre artistes", state: "ok" },
        { label: "Messagerie entre artistes", state: "ok" },
        { label: "Création de projets et principales interactions artistes", state: "ok" },
        { label: "Espace professionnel : conception et intégration", state: "wip" },
        { label: "Dossier artiste pour les pros", state: "wip" },
        { label: "Confidentialité : réflexion engagée", state: "wip" },
        { label: "Offre premium et modèle économique", state: "wip" },
        { label: "Visio artiste ↔ pro : possiblement hors V1", state: "later" },
        { label: "Vérification SIRET des professionnels", state: "later" },
      ], note: "Tests internes et vérifications du prototype en cours. Les tests utilisateurs structurés viendront après consolidation de l’étude de marché." },
      { id: "methode", title: "Méthode", paragraphs: ["Implémentation assistée par IA avec Claude Code et Codex, à partir des fonctionnalités, parcours et décisions produit définis dans le projet."], steps: ["Définir les fonctionnalités et le MVP", "Concevoir parcours, wireframes et maquettes", "Guider les outils IA", "Tester le prototype", "Itérer"] },
      { id: "stack", title: "Stack & outils", paragraphs: ["React Native · Expo · Supabase · Claude Code · Codex"], items: ["Application mobile : React Native 0.85.3, Expo SDK 56, Expo Router, React", "Supabase : authentification, backend et base de données", "Autour du mobile : une application web Next.js et une API Express", "Maquettes, design system et microcopy : Figma et Claude Design", "Implémentation assistée par IA : Claude Code et Codex"] },
      { id: "suite", title: "En cours & prochaines étapes", items: ["Diffuser les questionnaires artistes et professionnels", "Concevoir et intégrer l’espace professionnel et le dossier artiste", "Démarcher artistes et professionnels", "Business plan et modèle économique", "Création d’entreprise et pacte d’associés", "Mettre en place des tests utilisateurs structurés"] },
      { id: "apprentissages", title: "Ce que j’ai appris", paragraphs: [
        "Impulsion m’a appris à ne pas figer trop tôt une solution. Le projet est parti d’un besoin que j’avais identifié côté artistes, puis les échanges, l’étude de marché et l’ouverture aux professionnels ont progressivement élargi notre vision du produit.",
        "J’ai aussi compris qu’un prototype fonctionnel permet de rendre une idée concrète très rapidement, mais qu’il ne remplace pas la recherche utilisateur : certaines fonctionnalités doivent encore évoluer en fonction des besoins réels des artistes et des professionnels.",
        "Enfin, ce projet m’a permis de développer une approche de Product Builder : définir les parcours et les fonctionnalités, prototyper, utiliser l’IA pour accélérer l’implémentation, puis remettre en question la solution au fur et à mesure que l’on apprend.",
      ] },
    ],
  },
  {
    slug: "post-it-intelligent", number: "02", title: "Post-it intelligent", category: "OBJET CONNECTÉ · HARDWARE & SOFTWARE", theme: "paper",
    tagline: "Une idée numérique. Un objet bien réel.",
    description: "Un Post-it numérique autonome basé sur ESP32 et écran e-paper : météo, rappels, notes, images, recettes, courses et minuteurs, avec synchronisation locale et application mobile de contrôle.",
    tags: ["Conception produit", "ESP32", "Prototypage physique"], status: "Prototype physique fonctionnel",
    role: "Conception produit, électronique, logiciel et prototypage physique",
    facts: [
      { label: "MON RÔLE", value: "Conception produit, électronique, logiciel et prototypage physique" },
      { label: "ÉTAT", value: "Prototype fonctionnel · branche principale stable" },
      { label: "STACK", value: "ESP32 · C++ / Arduino · GxEPD2 · Node.js · Flutter · NVS · LittleFS · Impression 3D" },
    ],
    cover: postitVisuals.front.src, coverAlt: "Photo du prototype de Post-it intelligent : écran e-paper affichant la page Météo au-dessus du panneau solaire, dans un boîtier imprimé en 3D", coverPosition: "center 20%",
    showcase: [postitVisuals.front, postitVisuals.back], showcaseStyle: "photos", showcaseCaption: "PROTOTYPE RÉEL — FACE AVANT ET FACE ARRIÈRE",
    gallery: [], prototypeUrl: "",
    sections: [
      { id: "en-bref", title: "En bref", paragraphs: ["Conception d’un Post-it numérique autonome basé sur ESP32 et écran e-paper. Le prototype centralise météo, rappels, notes, images, recettes, courses et minuteurs, avec synchronisation locale, application mobile de contrôle et gestion avancée de la mise en veille.", "Le projet sert également de terrain d’expérimentation pour de futures interactions vocales et de nouveaux usages comme le Cooking Mode."] },
      { id: "solution", title: "Ce que fait l’objet", paragraphs: ["Sept pages sur un écran e-paper 2,13 pouces (212 × 104), parcourues avec un bouton physique."], items: ["Météo : page intégrée au prototype ; la source de données réelle reste à connecter dans la configuration actuelle", "Rappels : jusqu’à 10 rappels sur l’appareil", "Note personnalisée", "Image 1 bit en 212 × 104", "Recette", "Courses : commandes mises en file vers Caddely, mon application de liste de courses intelligente", "Minuteur : jusqu’à 5 minuteurs"] },
      { id: "fonctionnement", title: "Fonctionnement", items: ["LILYGO T5 (ESP32), bouton intégré (GPIO39) et écran e-paper 2,13 pouces", "Synchronisation avec un backend local Node.js", "Application Flutter de contrôle (outil fonctionnel, UI en cours d’itération)", "Deep sleep, avec réveil par bouton, minuteur ou rappel", "Persistance des données en NVS", "Capture de l’écran envoyée au backend et visible dans l’application", "Alertes de minuteur et de rappel affichées à l’écran"] },
      { id: "role", title: "Mon rôle", items: ["Conception produit et architecture logicielle", "Électronique et programmation assistée par IA", "Modélisation du boîtier avec SolidWorks et impression 3D", "Assemblage, tests et résolution de problèmes techniques"] },
      { id: "processus", title: "Le processus", steps: ["Définir les usages", "Concevoir l’architecture matérielle et logicielle", "Prototyper l’électronique et le boîtier", "Implémenter avec l’IA", "Assembler et tester"] },
      { id: "fabrication", title: "Électronique & fabrication", paragraphs: ["La carte LILYGO T5 (ESP32) et son bouton intégré, ainsi que l’écran e-paper 2,13 pouces, sont logés dans un boîtier modélisé sous SolidWorks puis imprimé en 3D, avec un panneau solaire en face avant. Côté alimentation, un chargeur Adafruit BQ25185 relie le panneau solaire et une batterie LiPo à la carte. Le prototype intègre aussi un micro INMP441 (I2S) et un buzzer, implantés en vue des interactions vocales et des alertes sonores ; ils ne sont pas encore exploités par le firmware actuel. Les tests matériels et logiciels ont accompagné chaque étape de l’assemblage."], figures: [postitVisuals.exploded, postitVisuals.schematic], note: "Alimentation solaire et batterie : expérimentation matérielle menée en parallèle du firmware actuel." },
      { id: "etat", title: "État actuel", paragraphs: ["La branche principale compile et fonctionne ; certaines expérimentations avancées sont développées dans des branches séparées. Le Post-it intelligent reste un prototype, pas un produit commercialisé."], status: [
        { label: "Sept pages e-paper et navigation par bouton", state: "ok" },
        { label: "Synchronisation avec le backend local et l’application Flutter", state: "ok" },
        { label: "Deep sleep et réveil par bouton, minuteur ou rappel", state: "ok" },
        { label: "Persistance NVS", state: "ok" },
        { label: "Capture de l’écran visible dans l’application", state: "ok" },
        { label: "Météo : source de données réelle à connecter", state: "wip" },
        { label: "Interactions vocales : architecture préparée et simulable", state: "wip" },
        { label: "Réveil par commande vocale (« OK Lili »)", state: "wip" },
        { label: "Cooking Mode - expérimentation en cours", state: "lab" },
        { label: "Panneau solaire et batterie : câblés côté matériel, non gérés par le firmware", state: "lab" },
      ] },
      { id: "evolutions", title: "Expérimentations & évolutions prévues", paragraphs: ["Architecture vocale préparée et simulable : le micro est implanté, mais la reconnaissance vocale réelle reste à intégrer au firmware. Déjà en place : configuration du mot d’activation « OK Lili », machine à états de session vocale, routes de simulation et interprétation de texte côté backend.", "Cooking Mode - expérimentation en cours, dans une branche séparée : étapes de recette, jusqu’à 12 ingrédients, navigation entre étapes, minuteurs d’étape et persistance LittleFS / NVS."], items: ["Exploiter le micro implanté pour une reconnaissance vocale réelle et le réveil par commande vocale", "Activer le buzzer implanté pour les alertes sonores, aujourd’hui visuelles", "Connecter une source météo réelle", "Stabiliser puis intégrer le Cooking Mode"] },
    ],
  },
  {
    slug: "sport-alimentation", number: "03", title: "PMF – Sport et alimentation", category: "APPLICATION MOBILE · FLUTTER", theme: "sport",
    tagline: "Entraînement, nutrition et progression réunis dans un même coach.",
    description: "PMF est un prototype mobile de coaching sport & alimentation développé en Flutter, combinant programmes d’entraînement, suivi de progression, nutrition personnalisée et assistance par IA.",
    tags: ["Priorisation MVP", "Prototype mobile", "IA"], status: "Prototype mobile fonctionnel · stockage local",
    showcase: [sportScreens.mission, sportScreens.plan, sportScreens.session], showcaseCaption: "ÉCRANS DU PROTOTYPE · UI EN COURS D’ITÉRATION",
    role: "Définition du produit, priorisation et implémentation assistée par IA",
    facts: [
      { label: "MON RÔLE", value: "Définition du produit, priorisation et logique fonctionnelle" },
      { label: "ÉTAT", value: "Prototype mobile fonctionnel · stockage local" },
      { label: "IMPLÉMENTATION", value: "Flutter, assistée par IA" },
    ],
    cover: "/projects/sport-alimentation/cover-logo-ecrans.webp", coverAlt: "Logo de l’application PMF (un bol avec une fourchette et deux feuilles, posé sur un haltère) entre deux écrans du prototype : plan alimentaire du jour et séance guidée en cours", gallery: [], prototypeUrl: "",
    sections: [
      { id: "en-bref", title: "En bref", paragraphs: ["PMF est un prototype mobile de coaching sport & alimentation développé en Flutter, combinant programmes d’entraînement, suivi de progression, nutrition personnalisée et assistance par IA. L’implémentation est assistée par IA, à partir des fonctionnalités et de la logique définies pour le produit."] },
      { id: "ia", title: "L’IA dans l’application", paragraphs: ["Une IA (Gemini) adapte les exercices et l’alimentation à la personne. Les échanges avec Gemini passent par un relais serverless qui garde la clé API côté serveur."], pillars: [
        { label: "Coach IA", text: "En conversation, il propose de remplacer les repas restants et d’ajuster les séances à venir de la semaine." },
        { label: "Profil mis à jour", text: "Douleur, objectif, exercices à éviter ou zones à travailler : le coach peut les ajouter au profil quand la personne en parle." },
        { label: "Recettes adaptées", text: "Sélection de recettes adaptées aux objectifs et au régime — intégration en cours." },
        { label: "Encouragements", text: "Pendant l’effort, des phrases générées dans le ton choisi : doux, motivant ou cash." },
      ], note: "La reconnaissance du matériel par photo, également réalisée avec Gemini, reste une expérimentation." },
      { id: "fonctionnalites", title: "Ce que contient le prototype", status: [
        { label: "Suivi sportif et profil sportif", state: "ok" },
        { label: "Adaptation et génération d’entraînements", state: "ok" },
        { label: "Objectifs et historique", state: "ok" },
        { label: "Suivi alimentaire et préférences", state: "ok" },
        { label: "Plan alimentaire sur 7 jours, repas remplaçables", state: "ok" },
        { label: "Listes de courses", state: "ok" },
        { label: "Recettes avec temps, calories et protéines", state: "ok" },
        { label: "Coach IA : adaptation des repas et des séances à venir", state: "ok" },
        { label: "Sélection de recettes adaptées via une base externe : intégration en cours", state: "wip" },
        { label: "Encouragements générés par l’IA selon le ton choisi", state: "ok" },
        { label: "Corps 3D : zones douloureuses et zones à travailler", state: "ok" },
        { label: "Exercices animés sur le modèle 3D, en même temps que l’utilisateur", state: "wip" },
        { label: "Progression et mesures corporelles", state: "wip" },
        { label: "Reconnaissance de matériel par photo via Gemini", state: "lab" },
        { label: "Envoi des courses vers Caddely, mon application de liste de courses", state: "lab" },
      ] },
      { id: "ecrans", title: "Les écrans", paragraphs: ["Écrans issus du prototype fonctionnel. Les fonctions marquées comme en cours ou expérimentales (animation 3D des exercices, Caddely, ajout de matériel par photo) ne sont pas finalisées.", "Le prototype a d’abord été construit pour valider les fonctionnalités et les parcours ; la direction UI continue d’évoluer."], chapters: [
        { id: "entrainement", letter: "A", title: "S’entraîner selon ses contraintes", text: "Chaque séance tient compte des contraintes physiques et du matériel disponible là où l’on s’entraîne, puis guide l’exercice pas à pas.", points: ["Séance adaptée aux contraintes, par exemple pour protéger un genou", "Uniquement le matériel du lieu sélectionné", "Minuteur, ressenti et encouragements générés par l’IA", "Modèle 3D qui réalise l’exercice en même temps que l’utilisateur (animation en cours)"], screens: [sportScreens.mission, sportScreens.session] },
        { id: "nutrition", letter: "B", title: "Manger selon ses goûts", text: "Plan alimentaire sur 7 jours avec possibilité de remplacer un repas selon les goûts, les ingrédients non appréciés ou simplement l’envie du jour. Le système propose alors une alternative.", points: ["Valider, passer ou remplacer un repas", "Préférences et aliments à éviter", "Recettes avec temps, calories et protéines", "Envoi des ingrédients vers Caddely (expérimentation)"], screens: [sportScreens.plan, sportScreens.hungry], note: "Caddely est une autre application que je développe : une liste de courses intelligente, encore au stade de prototype. Le prototype sport peut y envoyer les ingrédients de la semaine." },
        { id: "quotidien", letter: "C", title: "Adapter l’app à son quotidien", text: "Le profil centralise le lieu d’entraînement, le matériel, les contraintes et le ton des encouragements. Les données restent stockées sur le téléphone.", points: ["Inventaire du matériel par lieu", "Ajout de matériel par photo (expérimentation Gemini)", "Ton des encouragements : doux, motivant ou cash", "Données locales"], screens: [sportScreens.inventory, sportScreens.profile] },
        { id: "corps-3d", letter: "D", title: "Cibler les zones du corps", text: "Sur un modèle anatomique 3D, l’utilisateur indique ses zones douloureuses et les zones qu’il veut travailler. Les séances et le coach IA en tiennent compte.", points: ["Modèle anatomique 3D interactif", "Zones douloureuses et zones à travailler", "Prochaine étape, en cours : le modèle réalise chaque exercice en même temps que l’utilisateur"], screens: [], video: { src: "/projects/sport-alimentation/corps-3d.mp4", poster: "/projects/sport-alimentation/corps-3d-poster.webp", label: "Vidéo de l’écran Corps 3D : le modèle anatomique tourne et l’utilisateur sélectionne des zones à travailler", caption: "Écran Corps 3D : sélection des zones sur le modèle anatomique." } },
      ] },
      { id: "role", title: "Mon rôle", paragraphs: ["Je définis le produit, priorise les fonctionnalités et construis la logique entre sport et alimentation. L’implémentation est réalisée avec l’assistance de l’IA, puis testée et ajustée."], items: ["Priorisation du MVP", "Définition de la logique fonctionnelle", "Implémentation assistée par IA", "Tests du résultat et itérations"] },
      { id: "processus", title: "Le processus", steps: ["Définir le périmètre", "Structurer les fonctions", "Construire avec l’IA", "Tester les parcours", "Itérer"] },
      { id: "etat", title: "État actuel", paragraphs: ["Le prototype fonctionne sur mobile. Il n’a pas encore de backend applicatif ni d’authentification : les données sont principalement stockées en local à ce stade. Seul un petit relais serverless transmet les demandes à l’IA. L’animation 3D des exercices est en cours, et les expérimentations ne sont pas présentées comme des fonctionnalités finalisées."] },
      { id: "stack", title: "Stack & outils", items: ["Flutter : prototypage assisté par IA", "Stockage local", "Gemini : coach IA, encouragements et reconnaissance du matériel par photo (expérimentation)", "Relais serverless Node.js sur Vercel pour les appels à l’IA", "Blender : modèle 3D du corps (notions)"] },
    ],
  },
];
