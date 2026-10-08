import Link from "next/link";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { publicFileExists } from "@/lib/assets";
import { Arrow } from "./icon";
import { ProjectVisual } from "./project-visual";
import { Portrait } from "./portrait";

export function HeroWorkbench() {
  const hasPortrait = publicFileExists(profile.portrait);
  return <div className="portrait-workbench" aria-label="Portrait et projets">
    <div className="portrait-frame"><Portrait available={hasPortrait} /></div>
    <p className="portrait-note mono">DE L’IDÉE AU PROTOTYPE <span aria-hidden="true">↗</span></p>
    <div className="floating-projects">
      {projects.map(project => <Link key={project.slug} href={"/projets/" + project.slug} className={"floating-project floating-" + project.theme} aria-label={"Découvrir " + project.title}>
        <ProjectVisual project={project} />
        <div className="floating-caption"><span>{project.title}</span><Arrow diagonal /></div>
      </Link>)}
    </div>
  </div>;
}
