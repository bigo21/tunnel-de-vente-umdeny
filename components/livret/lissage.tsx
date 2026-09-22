"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/tunnel/gsap";

let lenis: Lenis | null = null;

/** Défile jusqu'à un élément, en passant par Lenis quand il est actif. */
export function defilerVers(cible: HTMLElement | number) {
  if (lenis) lenis.scrollTo(cible, { offset: -80, duration: 1.1 });
  else if (typeof cible === "number") window.scrollTo({ top: cible });
  else cible.scrollIntoView({ block: "start" });
}

/**
 * Défilement avec inertie (Lenis), synchronisé sur l'horloge de GSAP pour que
 * les scènes au défilement restent calées au pixel.
 *
 * Lenis n'est monté que si le visiteur accepte le mouvement et dispose d'un
 * pointeur fin : sur un écran tactile, le défilement natif du système est déjà
 * inertiel, et le doubler coûterait sans rien apporter.
 *
 * Pose aussi la classe `js-mouvement` sur <html>, qui arme les révélations
 * CSS : sans script, tout reste visible.
 */
export function Lissage() {
  const pathname = usePathname();

  useEffect(() => {
    const racine = document.documentElement;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fin = window.matchMedia("(pointer: fine)");

    const appliquer = () => {
      racine.classList.toggle("js-mouvement", !reduit.matches);

      if (!reduit.matches && fin.matches && !lenis) {
        // Chargé à la demande : un téléphone ne télécharge jamais Lenis.
        import("lenis").then(({ default: Lenis }) => {
          if (lenis || reduit.matches || !fin.matches) return;
          lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, autoRaf: false });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
        });
      } else if ((reduit.matches || !fin.matches) && lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenis = null;
      }
    };

    appliquer();
    reduit.addEventListener("change", appliquer);
    fin.addEventListener("change", appliquer);
    return () => {
      reduit.removeEventListener("change", appliquer);
      fin.removeEventListener("change", appliquer);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Nouvelle page : on repart du haut, sans inertie, et les déclencheurs
  // sont recalculés sur la nouvelle hauteur.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

function tick(temps: number) {
  lenis?.raf(temps * 1000);
}
