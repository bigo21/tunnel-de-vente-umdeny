"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/tunnel/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Le titre d'accroche, révélé ligne par ligne.
 *
 * Le texte est rendu normalement côté serveur : si le script ne s'exécute pas,
 * ou si le visiteur refuse le mouvement, il reste lisible tel quel.
 *
 * `autoSplit` redécoupe le titre quand la largeur change ou qu'une police
 * finit de charger — sans quoi les lignes resteraient calculées pour l'ancienne
 * mise en page et se chevaucheraient après une rotation d'écran.
 */
export function TitreRevele({
  texte,
  className,
}: {
  texte: string;
  className?: string;
}) {
  const cible = useRef<HTMLHeadingElement>(null);

  useScene((contexte, { mouvementAutorise }) => {
    const element = cible.current;
    if (!element || !mouvementAutorise) return;

    let decoupe: SplitText | null = null;

    contexte.add(() => {
      decoupe = SplitText.create(element, {
        type: "lines",
        // Chaque ligne est enveloppée pour pouvoir glisser derrière un masque.
        mask: "lines",
        autoSplit: true,
        // Rejoué à chaque redécoupage : la première fois à l'arrivée, puis à
        // chaque changement de largeur.
        onSplit: (instance) =>
          gsap.from(instance.lines, {
            yPercent: 115,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.09,
          }),
      });
    });

    return () => decoupe?.revert();
  }, [texte]);

  return (
    <h1 ref={cible} className={className}>
      {texte}
    </h1>
  );
}
