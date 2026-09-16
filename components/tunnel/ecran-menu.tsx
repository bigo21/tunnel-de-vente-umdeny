"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Parcours, Theme } from "@/lib/tunnel/types";
import { CASCADE, CASCADE_ENFANT, RESSORT_VIF } from "@/lib/tunnel/mouvement";
import {
  AFFICHE_HAUTEUR,
  AFFICHE_LARGEUR,
  afficheVideo,
} from "@/lib/tunnel/video";
import { IconeLecture } from "./icones";

/**
 * Étape 2a : la grille des sujets de la branche choisie. Chaque vignette
 * annonce une vidéo — c'est elle qui porte le parcours, le texte vient après.
 *
 * Les vignettes arrivent en cascade, et celle qu'on ouvre grandit jusqu'au
 * bandeau de l'écran suivant : le visiteur suit le même objet d'un écran à
 * l'autre plutôt que d'assister à un remplacement.
 */
export function EcranMenu({
  parcours,
  onChoisirTheme,
}: {
  parcours: Parcours;
  onChoisirTheme: (theme: Theme) => void;
}) {
  const teinte =
    parcours.teinte === "accent" ? "text-accent-clair" : "text-encre";

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-6 px-4 pb-12 pt-7 sm:gap-[clamp(24px,3vw,36px)] sm:px-[clamp(16px,4vw,52px)] sm:pb-[clamp(40px,6vw,72px)] sm:pt-[clamp(26px,4vw,52px)]">
      <div className="flex flex-col gap-3">
        <span className={`text-[11px] uppercase tracking-[0.24em] ${teinte}`}>
          {parcours.libelle}
        </span>
        <h1 className="max-w-[22ch] text-balance text-[clamp(25px,4.4vw,42px)] font-light leading-[1.06]">
          {parcours.titreMenu}
        </h1>
        <p className="font-texte max-w-[52ch] text-[15px] leading-[1.65] text-encre-tenue">
          Une vidéo par sujet. Choisissez, regardez, puis décidez si vous voulez
          être rappelé.
        </p>
      </div>

      <motion.div
        variants={CASCADE}
        initial="entrant"
        animate="present"
        className="grid gap-[clamp(14px,2vw,22px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]"
      >
        {parcours.themes.map((theme) => (
          <motion.button
            key={theme.cle}
            type="button"
            onClick={() => onChoisirTheme(theme)}
            variants={CASCADE_ENFANT}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.985 }}
            transition={RESSORT_VIF}
            className="halo-carte group flex min-w-0 cursor-pointer flex-col overflow-hidden border border-bordure bg-fond-carte text-left hover:border-accent"
          >
            <motion.span
              layoutId={`video-${theme.cle}`}
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-bordure bg-fond-media"
            >
              <Image
                src={afficheVideo(theme.video.id)}
                alt=""
                width={AFFICHE_LARGEUR}
                height={AFFICHE_HAUTEUR}
                sizes="(max-width: 700px) 100vw, 380px"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,41,0.25),rgba(3,9,41,0.75))]" />
              <span className="relative flex size-[54px] items-center justify-center rounded-full border border-accent bg-[rgba(192,143,81,0.28)] text-accent-clair backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-[rgba(192,143,81,0.5)]">
                <IconeLecture taille={19} />
              </span>
              <span className="absolute left-[14px] top-[13px] text-[10px] uppercase tracking-[0.22em] text-encre-douce">
                {theme.numero}
              </span>
              <span className="absolute bottom-[13px] right-[14px] text-[10px] uppercase tracking-[0.18em] text-encre-douce">
                {theme.video.duree}
              </span>
            </motion.span>
            <span className="flex min-w-0 flex-col gap-2 px-5 pb-5 pt-[18px]">
              <span className="text-[clamp(17px,2.4vw,21px)] leading-[1.15]">
                {theme.titre}
              </span>
              <span className="font-texte text-[13.5px] leading-[1.6] text-encre-tenue">
                {theme.accroche}
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </main>
  );
}
