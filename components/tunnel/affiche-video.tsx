"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { MARQUE } from "@/content/marque";
import { gsap, useScene } from "@/lib/tunnel/gsap";
import { RESSORT_VIF } from "@/lib/tunnel/mouvement";
import {
  AFFICHE_HAUTEUR,
  AFFICHE_LARGEUR,
  afficheVideo,
  VIDEOS_PROVISOIRES,
  type Video,
} from "@/lib/tunnel/video";
import { IconeLecture } from "./icones";

/**
 * Le bandeau vidéo des écrans d'accueil et de sujet : la vignette YouTube du
 * film, sous un voile qui laisse respirer le bouton de lecture.
 *
 * La vignette glisse au défilement — parallaxe pilotée par GSAP, indexée sur
 * la position réelle du bandeau dans la page plutôt que sur une durée.
 *
 * `nomMorph` relie ce bandeau à la vignette du menu qui porte le même
 * `layoutId` : la vignette grandit jusqu'ici au lieu de disparaître.
 */
export function AfficheVideo({
  video,
  libelle,
  surtitre,
  nomMorph,
  onLire,
}: {
  video: Video;
  libelle: string;
  surtitre?: string;
  nomMorph?: string;
  onLire: () => void;
}) {
  const cadre = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useScene((contexte, { mouvementAutorise }) => {
    if (!cadre.current || !image.current) return;

    if (!mouvementAutorise) {
      gsap.set(image.current, { yPercent: 0, scale: 1 });
      return;
    }

    contexte.add(() => {
      gsap.fromTo(
        image.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: cadre.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  }, [video.id]);

  return (
    <motion.div
      ref={cadre}
      layoutId={nomMorph}
      className="relative aspect-[4/3] max-h-[68svh] w-full overflow-hidden border-b border-bordure bg-fond-media sm:aspect-[16/10] lg:aspect-video [@media(max-height:520px)]:max-h-[52svh]"
    >
      {/* L'image est surdimensionnée pour pouvoir glisser sans laisser
          apparaître ses bords. */}
      <Image
        ref={image}
        src={afficheVideo(video.id)}
        alt=""
        width={AFFICHE_LARGEUR}
        height={AFFICHE_HAUTEUR}
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 size-full scale-[1.16] object-cover will-change-transform"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--voile-media)" }}
      />

      {surtitre && (
        <span className="pointer-events-none absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate text-[10px] uppercase tracking-[0.18em] text-encre-douce sm:left-[clamp(16px,4vw,44px)] sm:top-[clamp(14px,3vw,26px)] sm:text-[10.5px] sm:tracking-[0.22em]">
          {surtitre}
        </span>
      )}

      {VIDEOS_PROVISOIRES && (
        <span className="pointer-events-none absolute right-4 top-14 max-w-[calc(100%-2rem)] truncate border border-dashed border-bordure-forte bg-fond/70 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.14em] text-encre-sourde backdrop-blur-sm sm:right-[clamp(16px,4vw,44px)] sm:top-[clamp(14px,3vw,26px)] sm:text-[10px] sm:tracking-[0.18em]">
          {MARQUE.lecteur.mentionProvisoire}
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-4 gap-y-2 p-4 sm:gap-[18px] sm:p-[clamp(16px,3vw,34px)]">
        <motion.button
          type="button"
          onClick={onLire}
          aria-label={`Lancer la vidéo : ${libelle}`}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={RESSORT_VIF}
          className="bouton-or pointer-events-auto flex size-16 flex-none cursor-pointer items-center justify-center rounded-full sm:size-[clamp(58px,8vw,84px)]"
          style={{ boxShadow: "var(--ombre-accent)" }}
        >
          <IconeLecture taille={28} />
        </motion.button>
        <span className="min-w-0 flex-1 text-[10.5px] uppercase leading-snug tracking-[0.18em] text-accent-clair sm:text-[11px] sm:tracking-[0.24em]">
          {libelle}
        </span>
      </div>
    </motion.div>
  );
}
