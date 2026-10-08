"use client";
import { useEffect, useRef } from "react";
import type { Video } from "@/data/projects";

// Vidéo courte en boucle, muette et sans contrôles visibles.
// Lecture uniquement à l'écran, jamais avec prefers-reduced-motion ; clic ou Entrée pour mettre en pause.
export function AutoVideo({ video }: { video: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = (visible: boolean) => {
      if (visible && !reduced.matches && !pausedByUser.current) element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => sync(entry.isIntersecting), { threshold: .25 });
    observer.observe(element);
    const onMotionChange = () => sync(element.getBoundingClientRect().top < window.innerHeight);
    reduced.addEventListener("change", onMotionChange);
    return () => { observer.disconnect(); reduced.removeEventListener("change", onMotionChange); };
  }, []);

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    pausedByUser.current = !element.paused;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  };

  return <video ref={ref} muted loop playsInline preload="metadata" poster={video.poster} aria-label={`${video.label}. Activer pour mettre en pause ou relancer.`} tabIndex={0} onClick={toggle} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); } }}><source src={video.src} type="video/mp4" /></video>;
}
