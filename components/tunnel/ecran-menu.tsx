import { MARQUE } from "@/content/marque";
import type { Parcours, Theme } from "@/lib/tunnel/types";
import { IconeLecture } from "./icones";

/**
 * Étape 2a : la grille des sujets de la branche choisie. Chaque vignette
 * annonce une vidéo — c'est elle qui porte le parcours, le texte vient après.
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
    <main className="anim-entree mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-[clamp(22px,3vw,34px)] px-[clamp(16px,4vw,48px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(24px,4vw,48px)]">
      <div className="flex flex-col gap-2.5">
        <span className={`surtitre ${teinte}`}>{parcours.libelle}</span>
        <h1 className="titre text-balance text-[clamp(23px,3.8vw,34px)] leading-[1.08]">
          {parcours.titreMenu}
        </h1>
        <p className="max-w-[56ch] text-[14.5px] leading-[1.6] text-encre-sourde">
          {MARQUE.menu.intro}
        </p>
      </div>

      <div className="grid gap-[clamp(14px,2vw,20px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {parcours.themes.map((theme) => (
          <button
            key={theme.cle}
            type="button"
            onClick={() => onChoisirTheme(theme)}
            className="flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-marque border border-bordure-forte bg-fond-carte text-left transition-colors hover:border-accent"
          >
            <span
              className="relative flex aspect-video w-full items-center justify-center border-b border-bordure-forte"
              style={{
                background:
                  "radial-gradient(120% 120% at 40% 40%, #181c1d, var(--color-fond-media))",
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 12px, transparent 12px 24px)",
                }}
              />
              <span className="relative flex size-[52px] items-center justify-center rounded-full border border-accent bg-[rgba(221,99,22,0.16)] text-accent-clair">
                <IconeLecture taille={20} />
              </span>
              <span className="absolute left-3 top-3 text-[10.5px] uppercase tracking-[0.16em] text-encre-faible">
                {theme.numero}
              </span>
              <span className="absolute bottom-3 right-3 text-[10.5px] uppercase tracking-[0.14em] text-encre-faible">
                {theme.duree}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-[7px] px-[18px] pb-[18px] pt-4">
              <span className="titre text-[clamp(16px,2.4vw,19px)] leading-[1.15]">
                {theme.titre}
              </span>
              <span className="text-[13px] leading-[1.5] text-encre-sourde">
                {theme.accroche}
              </span>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
