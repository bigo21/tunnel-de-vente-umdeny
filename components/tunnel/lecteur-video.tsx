"use client";

import { useEffect, useRef } from "react";
import { MARQUE } from "@/content/marque";
import { IconeEcran } from "./icones";

/**
 * Lecteur en plein écran. Il ne joue rien : les films ne sont pas livrés, et
 * l'emplacement doit rester lisible comme temporaire. Quand les vidéos
 * arriveront, seul l'intérieur du cadre change.
 */
export function LecteurVideo({ onFermer }: { onFermer: () => void }) {
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
    <div
      role="dialog"
      aria-modal
      aria-label={MARQUE.lecteur.titre}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-[18px] bg-[rgba(4,5,5,0.94)] p-[clamp(16px,4vw,40px)]"
    >
      <div
        className="flex aspect-video w-full max-w-[1100px] flex-col items-center justify-center gap-3 border border-dashed border-encre-faible p-5 text-center"
        style={{
          background:
            "repeating-linear-gradient(135deg, #111415 0 14px, var(--color-fond-media) 14px 28px)",
        }}
      >
        <span className="text-encre-sourde">
          <IconeEcran />
        </span>
        <span className="text-[12px] uppercase tracking-[0.16em] text-encre-sourde">
          {MARQUE.lecteur.titre}
        </span>
        <span className="max-w-[40ch] text-[13px] leading-[1.55] text-encre-faible">
          {MARQUE.lecteur.mention}
        </span>
      </div>
      <button
        ref={fermeture}
        type="button"
        onClick={onFermer}
        className="cursor-pointer rounded-marque border border-encre-faible px-[22px] py-3 text-[14px] font-semibold transition-colors hover:border-accent hover:text-accent-clair"
      >
        Fermer le lecteur
      </button>
    </div>
  );
}
