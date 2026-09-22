"use client";

import { useEffect, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Socle GSAP du livret : tout ce qui dépend du défilement (fil de reliure,
 * inscription des entrées, section épinglée, parallaxe des planches).
 *
 * Chaque scène passe par `gsap.matchMedia` : le visiteur qui demande moins de
 * mouvement reçoit l'état final, sans animation, et le basculement en cours de
 * visite est pris en compte.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Les polices chargées après coup décalent les déclencheurs.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  // La barre d'adresse mobile change la hauteur visible : on l'ignore pour ne
  // pas recalculer en plein défilement ; une rotation reste prise en compte.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export type Portee = { mouvement: boolean };

/**
 * Monte une scène GSAP et la défait au démontage. `monter` est appelé avec
 * `mouvement: false` quand le visiteur a demandé à réduire les animations :
 * à lui de poser alors l'état final.
 */
export function useScene(
  monter: (portee: Portee) => void | (() => void),
  dependances: DependencyList = [],
) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      {
        anime: "(prefers-reduced-motion: no-preference)",
        sobre: "(prefers-reduced-motion: reduce)",
      },
      (contexte) => {
        const { anime } = contexte.conditions as { anime: boolean };
        return monter({ mouvement: anime });
      },
    );
    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependances);
}

/**
 * Inscrit les entrées marquées `data-inscrire` le long de leur réglure : le
 * filet se trace, puis le texte apparaît de gauche à droite, comme écrit à la
 * main sur la ligne. Le contenu reste lisible sans script (voir globals.css).
 */
export function inscrireEntrees(racine: HTMLElement, { mouvement }: Portee) {
  const entrees = racine.querySelectorAll<HTMLElement>("[data-inscrire]");
  if (!mouvement) {
    gsap.set(entrees, { clipPath: "inset(0 0% 0 0)" });
    return;
  }
  entrees.forEach((entree) => {
    gsap.fromTo(
      entree,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: entree, start: "top 88%", once: true },
      },
    );
  });
}
