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
 * Signale aussi le démarrage (`js-pret` sur <html>) au script de <head> qui
 * a armé les révélations CSS (`js-mouvement`) : sans ce signal, il les lève.
 */
export function Lissage() {
  const pathname = usePathname();

  useEffect(() => {
    const racine = document.documentElement;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fin = window.matchMedia("(pointer: fine)");

    // L'application a démarré : le script de <head> ne lèvera plus le masquage.
    racine.classList.add("js-pret");

    // Le navigateur annule une transition de page quand l'écran change de
    // taille pendant qu'elle joue (clavier mobile, rotation). La navigation,
    // elle, aboutit : l'annulation est sans conséquence et ne doit pas
    // remonter comme une erreur.
    const transitionAnnulee = (evenement: PromiseRejectionEvent) => {
      const raison = evenement.reason as { name?: string; message?: string } | null;
      if (
        raison &&
        (raison.name === "InvalidStateError" || raison.name === "AbortError") &&
        /transition/i.test(raison.message ?? "")
      ) {
        evenement.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", transitionAnnulee);

    const appliquer = (changement?: Event) => {
      // Au démarrage, on respecte ce que le script de <head> a décidé (il a pu
      // lever le masquage si l'application a tardé) ; ensuite on suit la
      // préférence du visiteur si elle change en cours de visite.
      if (changement) racine.classList.toggle("js-mouvement", !reduit.matches);
      else if (reduit.matches) racine.classList.remove("js-mouvement");

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
      window.removeEventListener("unhandledrejection", transitionAnnulee);
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
