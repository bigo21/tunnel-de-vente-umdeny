"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Socle GSAP du tunnel.
 *
 * GSAP prend en charge tout ce qui dépend du défilement — parallaxe, apparition
 * des sections, compteurs. Motion s'occupe du reste, au niveau des composants.
 *
 * Tout passe par `gsap.matchMedia`, qui coupe les animations quand le visiteur
 * a demandé à réduire les mouvements et les rétablit s'il change d'avis en
 * cours de route.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Les polices chargées après coup décalent tout : sans ce recalcul, les
  // déclencheurs resteraient positionnés sur la mise en page de substitution.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // Sur mobile, l'apparition et la disparition de la barre d'adresse changent
  // la hauteur visible ; on ignore ce cas pour ne pas recalculer en plein
  // défilement, mais une vraie rotation doit bien être prise en compte.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

type Portee = { mouvementAutorise: boolean };

/**
 * Exécute une mise en scène GSAP au montage et la défait au démontage.
 *
 * La scène est rejouée quand `dependances` change, et uniquement là : le corps
 * de `monter` ne doit donc lire que des références et des valeurs listées dans
 * ces dépendances.
 *
 * `monter` est appelé deux fois : une fois pour les visiteurs qui acceptent le
 * mouvement, une fois pour ceux qui le refusent. À chacun de décider quoi
 * faire dans les deux cas — le plus souvent, poser l'état final sans animer.
 */
export function useScene(
  monter: (contexte: gsap.Context, portee: Portee) => void | (() => void),
  dependances: unknown[] = [],
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
        // GSAP défait lui-même ce que la scène a créé ; la valeur rendue sert
        // aux nettoyages que le contexte ne connaît pas (SplitText, écoutes).
        return monter(contexte, { mouvementAutorise: anime });
      },
    );

    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependances);
}

/**
 * Révèle un groupe d'éléments à l'approche du défilement, les uns après les
 * autres. `selecteur` est résolu dans le conteneur passé en référence.
 */
export function revelerAuDefilement(
  contexte: gsap.Context,
  conteneur: RefObject<HTMLElement | null>,
  selecteur: string,
  { mouvementAutorise }: Portee,
) {
  const element = conteneur.current;
  if (!element) return;

  const cibles = element.querySelectorAll(selecteur);
  if (cibles.length === 0) return;

  if (!mouvementAutorise) {
    gsap.set(cibles, { opacity: 1, y: 0 });
    return;
  }

  contexte.add(() => {
    gsap.fromTo(
      cibles,
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
        },
      },
    );
  });
}
