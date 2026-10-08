import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/icon";
import { ProjectVisual } from "@/components/project-visual";
import { AutoVideo } from "@/components/auto-video";
import { ContactBanner } from "@/components/sections";
import { projects, type ProjectSection, type Screen, type Status } from "@/data/projects";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return project ? pageMetadata(`${project.title} — étude de cas`, `${project.description} Étude de cas de ${profile.name}, ${profile.role}.`, `/projets/${slug}`) : {};
}

const statusLabels: Record<Status["state"], string> = { ok: "Fonctionnel", wip: "En cours", later: "Pas encore réalisé", lab: "Expérimentation" };

// Maquettes mobiles : rendu fidèle (qualité 85) et ouverture en taille réelle.
function Phone({ screen, sizes, eager = false }: { screen: Screen; sizes: string; eager?: boolean }) {
  return <a href={screen.src} target="_blank" rel="noopener noreferrer" className="phone-link"><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={sizes} quality={85} {...(eager ? { loading: "eager" as const } : {})} className="phone-screen" /><span className="sr-only"> (taille réelle, nouvel onglet)</span></a>;
}

function SectionBody({ section }: { section: ProjectSection }) {
  return <>
    {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
    {section.steps && <ol className="case-steps">{section.steps.map((step, i) => <li key={step}><span className="mono">{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol>}
    {section.pillars && <div className="case-pillars">{section.pillars.map(pillar => <div key={pillar.label}><h3>{pillar.label}</h3><p>{pillar.text}</p></div>)}</div>}
    {section.items && <ul className="feature-list">{section.items.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>}
    {section.status && <ul className="status-list">{section.status.map(item => <li key={item.label} className={`status-${item.state}`}><span className="status-badge">{statusLabels[item.state]}</span>{item.label}</li>)}</ul>}
    {section.chapters?.map(chapter => <section key={chapter.id} id={chapter.id} className="case-chapter" aria-labelledby={`${chapter.id}-title`}>
      <div className="chapter-copy"><span className="chapter-letter" aria-hidden="true">{chapter.letter}</span><h3 id={`${chapter.id}-title`}>{chapter.title}</h3><p>{chapter.text}</p><ul>{chapter.points.map(point => <li key={point}>{point}</li>)}</ul>{chapter.note && <p className="case-note">{chapter.note}</p>}</div>
      {chapter.video
        ? <figure className="chapter-video"><AutoVideo video={chapter.video} /><figcaption>{chapter.video.caption}</figcaption></figure>
        : <div className="chapter-screens">{chapter.screens.map(screen => <figure key={screen.src}><Phone screen={screen} sizes="(max-width: 600px) 44vw, (max-width: 1100px) 30vw, 250px" /><figcaption>{screen.caption}</figcaption></figure>)}</div>}
    </section>)}
    {section.figures && <div className="case-gallery photo-gallery">{section.figures.map(figure => <figure key={figure.src}><Phone screen={figure} sizes="(max-width: 480px) 100vw, (max-width: 1100px) 45vw, 480px" /><figcaption>{figure.caption}</figcaption></figure>)}</div>}
    {section.note && <p className="case-note">{section.note}</p>}
  </>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const sections = project.gallery.length > 0 ? [...project.sections, { id: "visuels", title: "Visuels" }] : project.sections;
  return <><article>
    <header className="shell case-hero">
      <Link href="/#projets" className="text-link back-link"><span aria-hidden="true">←</span> Tous les projets</Link>
      <p className="eyebrow">{project.number} / ÉTUDE DE CAS <span className="case-category">{project.category}</span></p>
      <h1>{project.title}<span className="orange">.</span></h1>
      <p className="case-tagline">{project.tagline}</p>
      <dl className="case-summary">{project.facts.map(fact => <div key={fact.label}><dt className="eyebrow">{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    </header>
    <div className="shell">
      {project.showcase
        ? <figure className={`case-showcase ${project.showcaseStyle === "photos" ? "showcase-photos" : ""}`}><div className="showcase-screens">{project.showcase.map((screen, i) => <Phone key={screen.src} screen={screen} sizes={project.showcaseStyle === "photos" ? "(max-width: 600px) 45vw, 400px" : "(max-width: 600px) 31vw, 280px"} eager={project.showcaseStyle === "photos" || i === 1} />)}</div>{project.showcaseCaption && <figcaption className="mono">{project.showcaseCaption}</figcaption>}</figure>
        : <ProjectVisual project={project} large />}
    </div>
    <div className="shell case-body">
      <aside className="case-toc"><p className="eyebrow">DANS CE PROJET</p><nav aria-label="Sommaire du projet">{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav></aside>
      <div className="case-sections">
        {project.sections.map((section, i) => <section key={section.id} id={section.id} className={`case-section case-${section.id}`}><span className="eyebrow section-index">{String(i + 1).padStart(2, "0")} /</span><h2>{section.title}</h2><SectionBody section={section} /></section>)}
        {project.gallery.length > 0 && <section id="visuels" className="case-section"><span className="eyebrow section-index">{String(project.sections.length + 1).padStart(2, "0")} /</span><h2>Visuels</h2><div className={`case-gallery ${project.gallery.every(asset => asset.height > asset.width) ? "screens-gallery" : "photo-gallery"}`}>{project.gallery.map(asset => <figure key={asset.src}><Phone screen={asset} sizes="(max-width: 600px) 50vw, 260px" /><figcaption>{asset.caption}</figcaption></figure>)}</div></section>}
        {project.prototypeUrl && <a className="button button-dark mt-6" href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">Ouvrir le prototype <Arrow diagonal /></a>}
      </div>
    </div>
  </article><div className="shell next-project"><span className="eyebrow">POUR CONTINUER L’EXPLORATION</span><Link href={`/projets/${next.slug}`}><span>{next.title}</span><Arrow diagonal /></Link></div><ContactBanner /></>;
}
