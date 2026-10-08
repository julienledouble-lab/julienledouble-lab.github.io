import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

// Vérifié au build : un fichier absent de public/ ne génère jamais de lien cassé.
export function publicFileExists(file: string) {
  return Boolean(file) && existsSync(path.join(process.cwd(), "public", file));
}

// Le bouton CV n'apparaît qu'une fois public/cv.pdf déposé (puis rebuild).
export function resumeHref() {
  return publicFileExists(profile.resume) ? profile.resume : "";
}
