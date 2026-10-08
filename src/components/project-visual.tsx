import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.cover) return <div className={`project-visual actual-visual ${large ? "large" : ""}`}><Image src={project.cover} alt={project.coverAlt} fill sizes={large ? "(max-width: 800px) 100vw, 1200px" : "(max-width: 800px) 100vw, 60vw"} className="object-cover" style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined} /></div>;
  return <div className={`project-visual visual-${project.theme} ${large ? "large" : ""}`}>
    <span className="visual-corner" aria-hidden="true">{project.number} / EXPLORATION PRODUIT</span>
    <div className="abstract-composition" aria-hidden="true">
      {project.theme === "impulsion" && <><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="music-word">impulsion<span>●</span></div><div className="waveform">{Array.from({ length: 39 }, (_, i) => <i key={i} style={{ height: `${16 + ((i * 17 + i * i * 3) % 58)}px` }} />)}</div><span className="visual-footnote">RENCONTRER. CRÉER. COLLABORER.</span></>}
      {project.theme === "paper" && <><div className="paper-grid" /><div className="paper-shape paper-back" /><div className="paper-shape paper-front"><span>Une idée.<br />Un objet.<br /><em>Au quotidien.</em></span><span className="paper-cross">+</span></div><span className="visual-footnote">DU NUMÉRIQUE AU PHYSIQUE</span></>}
      {project.theme === "sport" && <><div className="sport-ring ring-one" /><div className="sport-ring ring-two" /><div className="sport-ring ring-three" /><div className="sport-word">Mieux manger.<br /><span>Se mettre<br />en mouvement.</span></div><span className="visual-footnote">ALIMENTATION × MOUVEMENT</span></>}
    </div>
    <span className="placeholder-label">Visuel conceptuel</span>
  </div>;
}
