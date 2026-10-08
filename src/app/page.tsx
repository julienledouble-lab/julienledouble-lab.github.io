import Link from "next/link";
import { Arrow, Spark } from "@/components/icon";
import { ProjectCard } from "@/components/project-card";
import { HeroWorkbench } from "@/components/hero-workbench";
import { ContactBanner, Process, SectionTitle, SkillsGrid } from "@/components/sections";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(profile.role, profile.intro, "/", true);

export default function Home() {
  return <>
    <section className="shell studio-hero" aria-labelledby="hero-title">
      <div className="studio-intro">

        <h1 id="hero-title"><span>Imaginer des produits.</span><span className="builder-line">Les concrétiser.</span></h1>
        <p className="studio-description">{profile.intro}</p>
        <p className="hero-location"><span className="status-dot" /><span className="hero-location-text"><span>{profile.region}<span className="hero-location-sep"> ·</span></span> <span>{profile.availability}</span></span></p>
        <div className="hero-actions"><Link href="#projets" className="button button-dark">Voir mes projets <Arrow diagonal /></Link><Link href="/contact" className="text-link">Me contacter <Arrow diagonal /></Link></div>
      </div>
      <HeroWorkbench />
    </section>
    <div className="discipline-strip" aria-label="Mes domaines d’exploration"><div className="shell"><span>PRODUCT THINKING</span><Spark /><span>UX/UI</span><Spark /><span>PROTOTYPAGE</span><Spark /><span>IA</span><Spark /><span>PRODUITS NUMÉRIQUES & CONNECTÉS</span></div></div>
    <section id="posture" className="builder-manifesto" aria-labelledby="posture-title"><div className="shell manifesto-grid"><div><p className="eyebrow">01 / MA POSTURE</p><h2 id="posture-title">La réflexion est humaine.<br /><span>La construction est<br />augmentée par l’IA.</span></h2><Link href="/a-propos" className="button button-light">Découvrir mon parcours <Arrow diagonal /></Link></div><div className="manifesto-note"><Spark /><p>{profile.approach}</p><p>J’utilise Claude Code et Codex pour accélérer l’implémentation,<br /><strong>tout en gardant la maîtrise des choix produit et de la validation.</strong></p></div></div></section>
    <section id="projets" className="shell section-space selected-work" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="eyebrow"><span className="section-number">02 /</span>LA PREUVE PAR LES PROJETS</p><h2 id="projects-title">Projets<br /><span className="serif">sélectionnés.</span></h2></div><p>Des projets conçus de l’idée au prototype, entre applications, IA, UX/UI et objets connectés.</p></div>
      <div className="projects-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    </section>
    <section className="skills-section"><div className="shell section-space"><SectionTitle number="03 /" label="CE QUE JE MOBILISE" title="De l’intuition à l’exécution."><Link href="/competences" className="text-link">Explorer mes compétences <Arrow diagonal /></Link></SectionTitle><SkillsGrid /></div></section>
    <section className="shell section-space method-section"><SectionTitle number="04 /" label="MON MODE OPÉRATOIRE" title="Faire. Tester. Recommencer."><p>Comprendre, définir, concevoir,<br />construire, tester, itérer.</p></SectionTitle><Process /><div className="method-bottom"><span className="mono">LE FIL CONDUCTEUR</span><p>Garder ce qui aide l’utilisateur.<br /><strong>Repenser ce qui le bloque.</strong></p><Link href="/a-propos" className="round-link" aria-label="En savoir plus sur ma démarche"><Arrow diagonal /></Link></div></section>
    <ContactBanner />
  </>;
}
