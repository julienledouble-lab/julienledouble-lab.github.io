import Link from "next/link";
import type { Project } from "@/data/projects";
import { Arrow } from "./icon";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projets/${project.slug}`} className={`project-card card-${project.theme}`}>
    <ProjectVisual project={project} />
    <div className="project-card-content"><div className="eyebrow"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.title}<span className="project-arrow"><Arrow diagonal /></span></h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="case-link">Dans les coulisses du projet <Arrow /></span></div>
  </Link>;
}
