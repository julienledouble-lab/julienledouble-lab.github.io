import { ContactLinks } from "@/components/sections";
import { Spark } from "@/components/icon";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contact", "Ouvert aux opportunités en Product Builder, UX/UI et IA, en alternance ou en emploi. Email, téléphone, LinkedIn et GitHub.", "/contact");
export default function ContactPage() {
  return <div className="shell contact-page"><section className="page-hero"><p className="eyebrow"><span className="status-dot" />ALTERNANCE OU EMPLOI · PRODUCT · UX/UI · IA</p><h1>Un projet, une opportunité<br /><span className="serif">ou envie d’échanger ?</span></h1><p className="page-lead">Une équipe produit, une idée à explorer ou un prototype à construire ? Écrivez-moi ou appelez-moi.</p></section><div className="contact-layout"><div><ContactLinks /></div><aside className="contact-aside"><Spark /><h2>Construire.<br />Apprendre.<br />Contribuer.</h2><p>{profile.availability}.</p><p>{profile.location}</p><div className="tags"><span>Product Builder</span><span>UX/UI</span><span>IA & prototypage</span></div></aside></div></div>;
}
