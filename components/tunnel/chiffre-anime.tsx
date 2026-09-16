"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/tunnel/gsap";

/**
 * Compte jusqu'à la valeur affichée quand le chiffre entre dans le champ de
 * vision. La partie non numérique (« 48 h ») est conservée telle quelle, et le
 * zéro initial de « 04 » est restitué à l'arrivée.
 *
 * Le rendu serveur affiche déjà la valeur finale : si le script ne s'exécute
 * pas, le visiteur lit le bon chiffre.
 */
export function ChiffreAnime({ valeur }: { valeur: string }) {
  const cible = useRef<HTMLSpanElement>(null);

  useScene((contexte, { mouvementAutorise }) => {
    const element = cible.current;
    if (!element) return;

    const chiffres = valeur.match(/\d+/);
    // Un décompte vers zéro n'a rien à raconter : on laisse la valeur en place.
    if (!mouvementAutorise || !chiffres || Number(chiffres[0]) === 0) return;

    const final = Number(chiffres[0]);
    const largeur = chiffres[0].length;
    const compteur = { valeur: 0 };

    contexte.add(() => {
      gsap.to(compteur, {
        valeur: final,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = valeur.replace(
            chiffres[0],
            String(Math.round(compteur.valeur)).padStart(largeur, "0"),
          );
        },
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });
  }, [valeur]);

  return (
    <span ref={cible} className="tabular-nums">
      {valeur}
    </span>
  );
}
