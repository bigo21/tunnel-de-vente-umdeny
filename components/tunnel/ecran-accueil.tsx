import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import type { CleParcours } from "@/lib/tunnel/types";
import { AfficheVideo } from "./affiche-video";

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
    <main className="anim-entree flex flex-1 flex-col">
      <AfficheVideo libelle={MARQUE.accueil.libelleVideo} onLire={onLire} />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[clamp(26px,4vw,40px)] px-[clamp(16px,4vw,52px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(30px,5vw,56px)]">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.24em] text-accent">
            {MARQUE.accueil.surtitre}
          </span>
          <h1 className="max-w-[20ch] text-balance text-[clamp(30px,5.6vw,58px)] font-light leading-[1.03] tracking-[-0.01em]">
            {MARQUE.accueil.titre}
          </h1>
          <p className="font-texte max-w-[54ch] text-[clamp(15px,2.1vw,18px)] leading-[1.65] text-encre-douce">
            {MARQUE.accueil.intro}
          </p>
        </div>

        <div className="grid gap-[clamp(14px,2vw,20px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr))]">
          {(Object.keys(PARCOURS) as CleParcours[]).map((cle, index) => {
            const parcours = PARCOURS[cle];
            const accentue = parcours.teinte === "accent";
            return (
              <button
                key={cle}
                type="button"
                onClick={() => onChoisirParcours(cle)}
                className={`flex cursor-pointer flex-col gap-3 border border-bordure-forte p-[clamp(20px,3vw,28px)] text-left transition-colors ${
                  accentue ? "hover:border-accent" : "hover:border-encre"
                }`}
                style={{
                  background:
                    "linear-gradient(150deg, var(--color-fond-carte-haut), #060c26)",
                }}
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
                  {parcours.carteAccueil.action}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-[clamp(18px,3vw,30px)] border-t border-bordure pt-[clamp(20px,3vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          {MARQUE.accueil.chiffresCles.map((chiffre) => (
            <div key={chiffre.valeur} className="flex flex-col gap-1.5">
              <span className="text-[clamp(26px,4vw,34px)] font-light text-accent-clair">
                {chiffre.valeur}
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
