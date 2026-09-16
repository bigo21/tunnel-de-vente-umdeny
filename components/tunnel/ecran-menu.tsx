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
    <main className="anim-entree mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-[clamp(24px,3vw,36px)] px-[clamp(16px,4vw,52px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(26px,4vw,52px)]">
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

      <div className="grid gap-[clamp(14px,2vw,22px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr))]">
        {parcours.themes.map((theme) => (
          <button
            key={theme.cle}
            type="button"
            onClick={() => onChoisirTheme(theme)}
            className="flex min-w-0 cursor-pointer flex-col overflow-hidden border border-bordure bg-fond-carte text-left transition-colors hover:border-accent"
          >
            <span
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-bordure"
              style={{
                background:
                  "radial-gradient(120% 130% at 35% 25%, #131c55, var(--color-fond-media))",
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(135deg, rgba(223,181,109,0.045) 0 1px, transparent 1px 16px)",
                }}
              />
              <span
                className="reflet-media absolute inset-y-0 w-[32%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(223,181,109,0.10), transparent)",
                }}
              />
              <span className="relative flex size-[54px] items-center justify-center rounded-full border border-accent bg-[rgba(192,143,81,0.14)] text-accent-clair">
                <IconeLecture taille={19} />
              </span>
              <span className="absolute left-[14px] top-[13px] text-[10px] uppercase tracking-[0.22em] text-encre-sourde">
                {theme.numero}
              </span>
              <span className="absolute bottom-[13px] right-[14px] text-[10px] uppercase tracking-[0.18em] text-encre-sourde">
                {theme.duree}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-2 px-5 pb-5 pt-[18px]">
              <span className="text-[clamp(17px,2.4vw,21px)] leading-[1.15]">
                {theme.titre}
              </span>
              <span className="font-texte text-[13.5px] leading-[1.6] text-encre-tenue">
                {theme.accroche}
              </span>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
