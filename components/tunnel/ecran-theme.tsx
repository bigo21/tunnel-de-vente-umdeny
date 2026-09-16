import type { Parcours, Theme } from "@/lib/tunnel/types";
import { AfficheVideo } from "./affiche-video";

/**
 * Étape 2b : un sujet déplié. Vidéo, puis le triptyque Contexte / Problème /
 * Solution, puis les formulaires qui lui correspondent. Le premier formulaire
 * prend l'aplat orange : un seul appel à l'action dominant par écran.
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
        libelle={`Vidéo « ${theme.titre} » · ${theme.duree} — emplacement`}
        repere={`${theme.numero} · ${parcours.libelle}`}
        teinteRepere={teinte}
        onLire={onLire}
      />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(22px,3vw,32px)] px-[clamp(16px,4vw,48px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(24px,4vw,42px)]">
        <h1 className="titre max-w-[26ch] text-balance text-[clamp(24px,4.2vw,38px)] leading-[1.06]">
          {theme.titre}
        </h1>

        <div className="grid gap-[clamp(18px,3vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
          {[
            { intitule: "Contexte", texte: theme.contexte },
            { intitule: "Problème", texte: theme.probleme },
            { intitule: "Solution", texte: theme.solution },
          ].map((volet) => (
            <section
              key={volet.intitule}
              className="flex flex-col gap-[7px] border-t-2 border-bordure-forte pt-[14px]"
            >
              <h2
                className={`text-[10.5px] uppercase tracking-[0.18em] ${teinte}`}
              >
                {volet.intitule}
              </h2>
              <p className="text-[14px] leading-[1.6] text-encre-tenue">
                {volet.texte}
              </p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {theme.formulaires.map((libelle, index) => (
            <button
              key={libelle}
              type="button"
              onClick={() => onOuvrirFormulaire(libelle)}
              className={`cursor-pointer rounded-marque px-6 py-[14px] text-[14.5px] font-semibold ${
                index === 0
                  ? "bouton-accent border-2 border-accent"
                  : "border-2 border-encre-faible transition-colors hover:border-accent hover:text-accent-clair"
              }`}
            >
              {libelle}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRetourMenu}
          className="cursor-pointer self-start border-b border-encre-faible py-1.5 text-[13.5px] text-encre-sourde transition-colors hover:text-accent-clair"
        >
          Voir les autres vidéos
        </button>
      </div>
    </main>
  );
}
