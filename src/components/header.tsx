"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Arrow } from "./icon";

const links = [{ href: "/a-propos", label: "À propos" }, { href: "/#projets", label: "Projets" }, { href: "/competences", label: "Compétences" }];

export function Header({ resume = "" }: { resume?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } };
    const onOutside = (event: PointerEvent) => { if (open && !nav.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutside);
    return () => { document.removeEventListener("keydown", onEscape); document.removeEventListener("pointerdown", onOutside); };
  }, [open]);
  return <header className="site-header">
    <div className="shell header-inner">
      <Link href="/" className="brand" aria-label={`${profile.name} — accueil`} onClick={() => setOpen(false)}><span className="brand-mark">{profile.initials}<span>.</span></span><span className="brand-caption">Julien<br />LEDOUBLE</span></Link>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Fermer" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav ref={nav} id="main-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        {resume && <a href={resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>CV<span className="sr-only"> (PDF, nouvel onglet)</span></a>}
        <Link href="/contact" className="nav-contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={() => setOpen(false)}>Me contacter <Arrow diagonal /></Link>
      </nav>
    </div>
  </header>;
}
