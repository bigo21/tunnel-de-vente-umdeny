"use client";

import { useEffect, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Socle GSAP du livret : tout ce qui dépend du défilement (fil de reliure,
 * inscription des entrées, section épinglée, parallaxe des planches).
 *
 * Chaque scène passe par `gsap.matchMedia` : le visiteur qui demande moins de
 * mouvement reçoit l'état final, sans animation, et le basculement en cours de
 * visite est pris en compte.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Les polices chargées après coup décalent les déclencheurs.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  // La barre d'adresse mobile change la hauteur visible : on l'ignore pour ne
  // pas recalculer en plein défilement ; une rotation reste prise en compte.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export type Portee = { mouvement: boolean };

/** Options d'entrée : `navigation` vaut vrai après un changement de page. */
export type OptionsEntree = Portee & { navigation: boolean };

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
 * Entrée d'une page du livret, jouée au chargement comme après chaque
 * changement de page :
 * 1. le titre monte ligne par ligne derrière un masque ;
 * 2. au premier chargement, la planche du film se dévoile de bas en haut
 *    (clip-path) et son image se resserre dans le cadre ;
 * 3. les éléments marqués `data-entree` suivent, l'un après l'autre.
 *
 * Tout part d'un état déjà masqué par le CSS (`.js-mouvement`) pour éviter le
 * flash ; sans mouvement, tout est posé d'emblée.
 */
export function entreePage(
  racine: HTMLElement,
  { mouvement, navigation }: OptionsEntree,
) {
  const titre = racine.querySelector<HTMLElement>("h1:not([data-tardif])");
  const planches = racine.querySelectorAll<HTMLElement>("[data-devoiler]");
  const suite = racine.querySelectorAll<HTMLElement>("[data-entree]");

  if (!mouvement) {
    gsap.set([titre, ...planches, ...suite].filter(Boolean), {
      clearProps: "opacity,visibility,transform,clipPath",
    });
    return;
  }

  const ligne = gsap.timeline({ defaults: { ease: "expo.out" } });

  if (titre) {
    const decoupe = SplitText.create(titre, {
      type: "lines",
      mask: "lines",
      linesClass: "ligne-titre",
    });
    gsap.set(titre, { visibility: "visible" });
    ligne.from(decoupe.lines, { yPercent: 110, duration: 1.15, stagger: 0.09 }, 0);
    ligne.eventCallback("onComplete", () => decoupe.revert());
  }

  // Après une navigation, la planche arrive déjà par la transition partagée
  // depuis la page précédente : la dévoiler une seconde fois ferait doublon.
  if (navigation) gsap.set(planches, { visibility: "visible" });
  else planches.forEach((planche, i) => {
    const image = planche.querySelector("img");
    ligne.fromTo(
      planche,
      { clipPath: "inset(100% 0% 0% 0%)", visibility: "visible" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
      0.15 + i * 0.1,
    );
    if (image) {
      ligne.fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.6 }, 0.15 + i * 0.1);
    }
  });

  if (suite.length) {
    ligne.fromTo(
      suite,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
      0.35,
    );
  }
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
