"use client";

import { motion } from "motion/react";
import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import type { CleParcours } from "@/lib/tunnel/types";
import { CASCADE, CASCADE_ENFANT, RESSORT_VIF } from "@/lib/tunnel/mouvement";
import { AfficheVideo } from "./affiche-video";
import { ChiffreAnime } from "./chiffre-anime";
import { TitreRevele } from "./titre-revele";

/**
 * Étape 1 : la vidéo d'accueil, puis le point de bascule entre les deux
 * profils. C'est la première expérience de la marque pour un visiteur venu
 * des réseaux sociaux — elle explique avant de demander quoi que ce soit.
 */
export function EcranAccueil({
  onLire,
  onChoisirParcours,
}: {
  onLire: () => void;
  onChoisirParcours: (cle: CleParcours) => void;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <AfficheVideo
        video={MARQUE.accueil.video}
        libelle={MARQUE.accueil.libelleVideo}
        onLire={onLire}
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[clamp(26px,4vw,40px)] px-[clamp(16px,4vw,52px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(30px,5vw,56px)]">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.24em] text-accent">
            {MARQUE.accueil.surtitre}
          </span>
          <TitreRevele
            texte={MARQUE.accueil.titre}
            className="max-w-[20ch] text-balance text-[clamp(30px,5.6vw,58px)] font-light leading-[1.03] tracking-[-0.01em]"
          />
          <p className="font-texte max-w-[54ch] text-[clamp(15px,2.1vw,18px)] leading-[1.65] text-encre-douce">
            {MARQUE.accueil.intro}
          </p>
        </div>

        <motion.div
          variants={CASCADE}
          initial="entrant"
          animate="present"
          className="grid gap-[clamp(14px,2vw,20px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]"
        >
          {(Object.keys(PARCOURS) as CleParcours[]).map((cle, index) => {
            const parcours = PARCOURS[cle];
            const accentue = parcours.teinte === "accent";
            return (
              <motion.button
                key={cle}
                type="button"
                onClick={() => onChoisirParcours(cle)}
                variants={CASCADE_ENFANT}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                transition={RESSORT_VIF}
                style={{
                  background:
                    "linear-gradient(150deg, var(--color-fond-carte-haut), #060c26)",
                }}
                className={`halo-carte group flex cursor-pointer flex-col gap-3 border border-bordure-forte p-[clamp(20px,3vw,28px)] text-left ${
                  accentue ? "hover:border-accent" : "hover:border-encre"
                }`}
              >
                <span
                  className={`text-[10.5px] uppercase tracking-[0.24em] ${
                    accentue ? "text-accent" : "text-encre-sourde"
                  }`}
                >
                  Parcours {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(19px,2.8vw,25px)] leading-[1.1]">
                  {parcours.carteAccueil.titre}
                </span>
                <span className="font-texte text-[14.5px] leading-[1.6] text-encre-tenue">
                  {parcours.carteAccueil.accroche}
                </span>
                <span
                  className={`text-[13px] font-medium tracking-[0.06em] ${
                    accentue ? "text-accent-clair" : "text-encre"
                  }`}
                >
                  {parcours.carteAccueil.action.replace(" →", "")}{" "}
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    →
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid gap-[clamp(18px,3vw,30px)] border-t border-bordure pt-[clamp(20px,3vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          {MARQUE.accueil.chiffresCles.map((chiffre) => (
            <div key={chiffre.valeur} className="flex flex-col gap-1.5">
              <span className="text-[clamp(26px,4vw,34px)] font-light text-accent-clair">
                <ChiffreAnime valeur={chiffre.valeur} />
              </span>
              <p className="font-texte text-[13.5px] leading-[1.6] text-encre-tenue">
                {chiffre.legende}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
