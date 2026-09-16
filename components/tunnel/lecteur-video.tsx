"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { MARQUE } from "@/content/marque";
import { CADRE_LECTEUR, LECTEUR, RESSORT_VIF } from "@/lib/tunnel/mouvement";
import { lecteurVideo, VIDEOS_PROVISOIRES, type Video } from "@/lib/tunnel/video";

/**
 * Le lecteur YouTube, en fenêtre plein écran.
 *
 * Le cadre n'est monté qu'à l'ouverture : aucun script YouTube ni cookie tant
 * que le visiteur n'a pas cliqué sur lecture, et rien n'alourdit le premier
 * rendu du tunnel. Le domaine sans cookie est utilisé dans tous les cas.
 */
export function LecteurVideo({
  video,
  titre,
  onFermer,
}: {
  video: Video;
  titre: string;
  onFermer: () => void;
}) {
  const fermeture = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fermeture.current?.focus();

    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFermer();
    };
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [onFermer]);

  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label={titre}
      variants={LECTEUR}
      initial="entrant"
      animate="present"
      exit="sortant"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 overflow-y-auto bg-[rgba(2,5,20,0.95)] p-4 backdrop-blur-sm sm:gap-5 sm:p-[clamp(16px,4vw,44px)]"
    >
      <motion.div
        variants={CADRE_LECTEUR}
        className="w-full max-w-[1120px] shrink-0"
      >
        {/* En paysage sur téléphone, le 16/9 dépasserait la hauteur : on borne
            le cadre et on laisse les barres noires faire le reste. */}
        <div className="mx-auto aspect-video max-h-[62svh] w-full max-w-[calc(62svh*16/9)] overflow-hidden border border-bordure-forte bg-black">
          <iframe
            src={lecteurVideo(video.id)}
            title={titre}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="size-full border-0"
          />
        </div>
        {VIDEOS_PROVISOIRES && (
          <p className="font-texte m-0 pt-3 text-[13px] leading-[1.6] text-encre-faible">
            {MARQUE.lecteur.mentionProvisoire}.
          </p>
        )}
      </motion.div>

      <motion.button
        ref={fermeture}
        type="button"
        onClick={onFermer}
        variants={CADRE_LECTEUR}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={RESSORT_VIF}
        className="min-h-12 shrink-0 cursor-pointer border border-bordure-forte px-6 py-[13px] text-[14px] font-medium tracking-[0.03em] transition-[color,border-color,background-color] duration-200 hover:border-accent hover:bg-[rgba(192,143,81,0.08)] hover:text-accent-clair"
      >
        Fermer le lecteur
      </motion.button>
    </motion.div>
  );
}
