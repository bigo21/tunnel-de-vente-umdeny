"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { revelerAuDefilement, useScene } from "@/lib/tunnel/gsap";
import { RESSORT_VIF } from "@/lib/tunnel/mouvement";
import type { Parcours, Theme } from "@/lib/tunnel/types";
import { AfficheVideo } from "./affiche-video";

/**
 * Étape 2b : un sujet déplié. Vidéo, puis le triptyque Contexte / Problème /
 * Solution, puis les formulaires qui lui correspondent. Le premier formulaire
 * prend le bouton or : un seul appel à l'action dominant par écran.
 */
export function EcranTheme({
  parcours,
  theme,
  onLire,
  onOuvrirFormulaire,
  onRetourMenu,
}: {
  parcours: Parcours;
  theme: Theme;
  onLire: (theme: Theme) => void;
  onOuvrirFormulaire: (libelle: string) => void;
  onRetourMenu: () => void;
}) {
  const teinte =
    parcours.teinte === "accent" ? "text-accent-clair" : "text-encre";

  // Le triptyque se découvre au défilement, volet après volet.
  const triptyque = useRef<HTMLDivElement>(null);
  useScene(
    (contexte, portee) =>
      revelerAuDefilement(contexte, triptyque, "[data-volet]", portee),
    [theme.cle],
  );

  return (
    <main className="flex flex-1 flex-col">
      <AfficheVideo
        video={theme.video}
        libelle={`Film « ${theme.titre} » · ${theme.video.duree}`}
        surtitre={`${theme.numero} · ${parcours.libelle}`}
        nomMorph={`video-${theme.cle}`}
        onLire={() => onLire(theme)}
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[clamp(24px,3vw,36px)] px-4 pb-12 pt-7 sm:px-[clamp(16px,4vw,52px)] sm:pb-[clamp(40px,6vw,72px)] sm:pt-[clamp(26px,4vw,48px)]">
        <div className="flex flex-col gap-3">
          <h1 className="max-w-[24ch] text-balance text-[clamp(26px,4.6vw,44px)] font-light leading-[1.04] tracking-[-0.01em]">
            {theme.titre}
          </h1>
          <p className="font-texte max-w-[56ch] text-[clamp(15px,2.1vw,18px)] italic leading-[1.65] text-encre-douce">
            {theme.accroche}
          </p>
        </div>

        <div
          ref={triptyque}
          className="grid gap-[clamp(20px,3vw,34px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]"
        >
          {[
            { intitule: "Contexte", texte: theme.contexte },
            { intitule: "Problème", texte: theme.probleme },
            { intitule: "Solution", texte: theme.solution },
          ].map((volet) => (
            <section
              key={volet.intitule}
              data-volet
              className="avant-reveal flex flex-col gap-[9px] border-t border-bordure-forte pt-[15px]"
            >
              <h2
                className={`text-[10px] uppercase tracking-[0.24em] ${teinte}`}
              >
                {volet.intitule}
              </h2>
              <p className="font-texte text-[14.5px] leading-[1.7] text-encre-tenue">
                {volet.texte}
              </p>
            </section>
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[14px]">
          {theme.formulaires.map((libelle, index) => (
            <motion.button
              key={libelle}
              type="button"
              onClick={() => onOuvrirFormulaire(libelle)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={RESSORT_VIF}
              className={`min-h-12 w-full cursor-pointer px-[26px] py-[15px] text-center text-[14.5px] font-medium tracking-[0.03em] sm:w-auto ${
                index === 0
                  ? "bouton-or border border-accent-fonce hover:brightness-110"
                  : "border border-bordure-forte transition-[color,border-color,background-color] duration-200 hover:border-accent hover:bg-[rgba(192,143,81,0.08)] hover:text-accent-clair"
              }`}
            >
              {libelle}
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRetourMenu}
          className="inline-flex min-h-11 cursor-pointer items-center self-start text-[13.5px] text-encre-sourde underline decoration-bordure-forte underline-offset-[6px] transition-colors hover:text-accent-clair hover:decoration-accent"
        >
          Voir les autres vidéos
        </button>
      </div>
    </main>
  );
}
