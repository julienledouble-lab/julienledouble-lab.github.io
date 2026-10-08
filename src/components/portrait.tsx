"use client";
import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";
import { Spark } from "./icon";

export function Portrait({ available }: { available: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!available || failed) return <div className="portrait-placeholder" role="img" aria-label="Portrait à venir">
    <Spark /><span className="mono">PORTRAIT À VENIR</span><span className="portrait-placeholder-note">Une place pour le visage<br />derrière les projets.</span>
  </div>;
  return <Image src={profile.portrait} alt={"Portrait de " + profile.name + ", Product Builder"} fill sizes="(max-width: 600px) 75vw, (max-width: 1100px) 420px, 440px" quality={85} preload className="hero-portrait" onError={() => setFailed(true)} />;
}
