import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import type { CleParcours } from "@/lib/tunnel/types";
import { AfficheVideo } from "./affiche-video";

/**
 * Étape 1 : la vidéo d'accueil, puis le point de bascule entre les deux
 * profils. C'est la première expérience de la marque pour un visiteur venu
 * des réseaux sociaux — elle explique avant de demander quoi que ce soit.
 *
 * Le filet vertical de 4 px sur chaque carte est le repère de branche : sa
 * couleur suit le visiteur jusqu'à la confirmation.
 */
export function EcranAccueil({
  onLire,
  onChoisirParcours,
}: {
  onLire: () => void;
  onChoisirParcours: (cle: CleParcours) => void;
}) {
  return (
    <main className="anim-entree flex flex-1 flex-col">
      <AfficheVideo
        libelle={MARQUE.accueil.libelleVideo}
        repere={MARQUE.accueil.reperVideo}
        positionRepere="bas"
        hauteurMax="66svh"
        onLire={onLire}
      />

      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(20px,3vw,30px)] px-[clamp(16px,4vw,48px)] py-[clamp(26px,4vw,44px)]">
        <div className="flex flex-col gap-3">
          <h1 className="titre max-w-[24ch] text-balance text-[clamp(26px,4.6vw,44px)] leading-[1.05]">
            {MARQUE.accueil.titre}
          </h1>
          <p className="max-w-[52ch] text-[clamp(14px,2vw,16px)] leading-[1.6] text-encre-sourde">
            {MARQUE.accueil.intro}
          </p>
        </div>

        <div className="grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]">
          {(Object.keys(PARCOURS) as CleParcours[]).map((cle) => {
            const parcours = PARCOURS[cle];
            const accentue = parcours.teinte === "accent";
            return (
              <button
                key={cle}
                type="button"
                onClick={() => onChoisirParcours(cle)}
                className={`flex cursor-pointer flex-col gap-2.5 rounded-marque border border-bordure-forte border-l-4 bg-fond-carte-haut p-[clamp(18px,3vw,24px)] text-left transition-colors hover:bg-[#161a1b] ${
                  accentue
                    ? "border-l-accent hover:border-accent"
                    : "border-l-encre hover:border-encre"
                }`}
              >
                <span className="titre text-[clamp(17px,2.6vw,21px)]">
                  {parcours.carteAccueil.titre}
                </span>
                <span className="text-[13.5px] leading-[1.55] text-encre-sourde">
                  {parcours.carteAccueil.accroche}
                </span>
                <span
                  className={`text-[13px] font-semibold ${
                    accentue ? "text-accent-clair" : "text-encre"
                  }`}
                >
                  {parcours.carteAccueil.action}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
