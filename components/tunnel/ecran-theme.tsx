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
  onLire: () => void;
  onOuvrirFormulaire: (libelle: string) => void;
  onRetourMenu: () => void;
}) {
  const teinte =
    parcours.teinte === "accent" ? "text-accent-clair" : "text-encre";

  return (
    <main className="anim-entree flex flex-1 flex-col">
      <AfficheVideo
        libelle={`Film « ${theme.titre} » · ${theme.duree} — emplacement`}
        surtitre={`${theme.numero} · ${parcours.libelle}`}
        onLire={onLire}
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[clamp(24px,3vw,36px)] px-[clamp(16px,4vw,52px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(26px,4vw,48px)]">
        <div className="flex flex-col gap-3">
          <h1 className="max-w-[24ch] text-balance text-[clamp(26px,4.6vw,44px)] font-light leading-[1.04] tracking-[-0.01em]">
            {theme.titre}
          </h1>
          <p className="font-texte max-w-[56ch] text-[clamp(15px,2.1vw,18px)] italic leading-[1.65] text-encre-douce">
            {theme.accroche}
          </p>
        </div>

        <div className="grid gap-[clamp(20px,3vw,34px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))]">
          {[
            { intitule: "Contexte", texte: theme.contexte },
            { intitule: "Problème", texte: theme.probleme },
            { intitule: "Solution", texte: theme.solution },
          ].map((volet) => (
            <section
              key={volet.intitule}
              className="flex flex-col gap-[9px] border-t border-bordure-forte pt-[15px]"
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

        <div className="flex flex-wrap items-center gap-[14px]">
          {theme.formulaires.map((libelle, index) => (
            <button
              key={libelle}
              type="button"
              onClick={() => onOuvrirFormulaire(libelle)}
              className={`cursor-pointer px-[26px] py-[15px] text-[14.5px] font-medium tracking-[0.03em] ${
                index === 0
                  ? "bouton-or border border-accent-fonce"
                  : "border border-bordure-forte transition-colors hover:border-accent hover:text-accent-clair"
              }`}
            >
              {libelle}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRetourMenu}
          className="cursor-pointer self-start border-b border-bordure-forte py-1.5 text-[13.5px] text-encre-sourde transition-colors hover:text-accent-clair"
        >
          Voir les autres vidéos
        </button>
      </div>
    </main>
  );
}
