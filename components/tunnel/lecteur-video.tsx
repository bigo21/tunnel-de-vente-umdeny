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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[rgba(2,5,20,0.95)] p-[clamp(16px,4vw,44px)]"
    >
      <div
        className="flex aspect-video w-full max-w-[1120px] flex-col items-center justify-center gap-[14px] border border-dashed border-bordure-forte p-5 text-center"
        style={{
          background:
            "repeating-linear-gradient(135deg, var(--color-fond-carte-haut) 0 14px, var(--color-fond-carte) 14px 28px)",
        }}
      >
        <span className="text-encre-sourde">
          <IconeEcran />
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-encre-sourde">
          {MARQUE.lecteur.titre}
        </span>
        <span className="font-texte max-w-[42ch] text-[14px] leading-relaxed text-encre-faible">
          {MARQUE.lecteur.mention}
        </span>
      </div>
      <button
        ref={fermeture}
        type="button"
        onClick={onFermer}
        className="cursor-pointer border border-bordure-forte px-6 py-[13px] text-[14px] font-medium tracking-[0.03em] transition-colors hover:border-accent hover:text-accent-clair"
      >
        Fermer le lecteur
      </button>
    </div>
  );
}
