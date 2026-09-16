import Image from "next/image";
import { MARQUE } from "@/content/marque";
import { ETAPES, libelleEtape, numeroEtape, type Vue } from "@/lib/tunnel/etapes";

/**
 * En-tête collant : retour, logo, et l'avancement dans le tunnel. Le visiteur
 * doit toujours savoir où il en est et pouvoir reculer d'un cran.
 */
export function EnTete({ vue, onRetour }: { vue: Vue; onRetour: () => void }) {
  const etape = numeroEtape(vue);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-[clamp(12px,3vw,28px)] border-b border-bordure bg-fond/92 px-[clamp(16px,4vw,48px)] py-[14px] backdrop-blur-[8px]">
      <div className="flex min-w-0 items-center gap-[clamp(12px,3vw,24px)]">
        {vue !== "accueil" && (
          <button
            type="button"
            onClick={onRetour}
            className="flex-none cursor-pointer rounded-marque border border-encre-faible px-[14px] py-[9px] text-[13px] font-semibold transition-colors hover:border-accent hover:text-accent-clair"
          >
            ← Retour
          </button>
        )}
        <Image
          src={MARQUE.logo.src}
          alt={MARQUE.nom}
          width={MARQUE.logo.largeur}
          height={MARQUE.logo.hauteur}
          priority
          className="h-5 w-auto flex-none"
        />
      </div>

      <div className="flex min-w-0 items-center gap-2.5">
        <span className="surtitre min-w-0 truncate whitespace-nowrap text-encre-sourde">
          {libelleEtape(vue)}
        </span>
        <div
          className="flex flex-none gap-[5px]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={ETAPES}
          aria-valuenow={etape}
          aria-label="Avancement dans le parcours"
        >
          {Array.from({ length: ETAPES }, (_, i) => (
            <span
              key={i}
              className={`h-[3px] w-[22px] ${etape >= i + 1 ? "bg-accent" : "bg-bordure-forte"}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
