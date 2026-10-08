import Link from "next/link";
import { profile, skills, process } from "@/data/profile";
import { resumeHref } from "@/lib/assets";
import { Arrow, Spark } from "./icon";

export function SectionTitle({ number, label, title, children }: { number: string; label: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><span className="section-number">{number}</span>{label}</p><h2>{title}</h2></div>{children}</div>;
}

export function SkillsGrid() {
  return <div className="skills-grid">{skills.map(skill => <article key={skill.number} className="skill-card"><span className="mono muted">{skill.number} /</span><h3>{skill.title}</h3><p>{skill.description}</p><ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>;
}

export function Process() {
  return <div className="process-grid">{process.map((step, i) => <article key={step.title}><div className="process-top"><span className="step-number">0{i + 1}</span>{i < process.length - 1 && <Arrow />}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>;
}

const external = { target: "_blank", rel: "noopener noreferrer" };

export function ContactLinks() {
  const resume = resumeHref();
  const contacts = [
    { label: "Email", href: `mailto:${profile.email}`, detail: profile.email },
    { label: "Téléphone", href: profile.phoneHref, detail: profile.phone },
    { label: "LinkedIn", href: profile.linkedin, detail: "linkedin.com/in/julien-ledouble" },
    { label: "GitHub", href: profile.github, detail: "Prototypes et expérimentations" },
    ...(resume ? [{ label: "CV", href: resume, detail: "Mon parcours en un document (PDF)" }] : []),
  ];
  return <div className="contact-links">{contacts.map(contact => <a key={contact.label} className="contact-link" href={contact.href} {...(contact.href.startsWith("https://") || contact.href.endsWith(".pdf") ? external : {})}><span><strong>{contact.label}</strong><small>{contact.detail}</small></span><Arrow diagonal /></a>)}</div>;
}

export function ContactBanner() {
  const resume = resumeHref();
  return <section className="contact-banner" aria-labelledby="contact-title"><div className="shell contact-banner-inner"><div>
    <p className="eyebrow"><span className="status-dot" />ALTERNANCE OU EMPLOI · PRODUCT · UX/UI · IA</p>
    <h2 id="contact-title">Un projet, une opportunité<br /><span>ou envie d’échanger ?</span></h2>
    <p className="contact-direct"><a href={`mailto:${profile.email}`}>{profile.email}</a><span aria-hidden="true"> · </span><a href={profile.phoneHref}>{profile.phone}</a></p>
    <div className="contact-actions"><Link href="/contact" className="button button-light">Me contacter <Arrow diagonal /></Link><a href={profile.linkedin} {...external} className="text-link">LinkedIn <Arrow diagonal /></a>{resume && <a href={resume} {...external} className="text-link">Voir mon CV <Arrow diagonal /></a>}</div>
  </div><Spark className="contact-spark" /></div></section>;
}

export function Footer() {
  return <footer className="shell footer"><Link href="/" className="footer-name">{profile.name}<span> · {profile.role}</span></Link><p>De l’idée au prototype.</p><a href="#top" className="back-top">Retour en haut <span aria-hidden="true">↑</span></a></footer>;
}
