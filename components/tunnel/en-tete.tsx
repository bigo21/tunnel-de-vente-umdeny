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
    <header className="sticky top-0 z-20 flex items-center justify-between gap-[clamp(12px,3vw,28px)] border-b border-bordure bg-fond/92 px-[clamp(16px,4vw,52px)] py-[13px] backdrop-blur-[10px]">
      <div className="flex min-w-0 items-center gap-[clamp(12px,3vw,22px)]">
        {vue !== "accueil" && (
          <button
            type="button"
            onClick={onRetour}
            className="flex-none cursor-pointer border border-bordure-forte px-[15px] py-[9px] text-[13px] font-medium tracking-[0.04em] transition-colors hover:border-accent hover:text-accent-clair"
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
          className="h-[clamp(22px,3.4vw,30px)] w-auto flex-none"
        />
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <span className="min-w-0 truncate text-[10.5px] uppercase tracking-[0.22em] text-encre-sourde">
          {libelleEtape(vue)}
        </span>
        <div
          className="flex flex-none gap-1"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={ETAPES}
          aria-valuenow={etape}
          aria-label="Avancement dans le parcours"
        >
          {Array.from({ length: ETAPES }, (_, i) => (
            <span
              key={i}
              className={`h-0.5 w-5 ${etape >= i + 1 ? "bg-accent" : "bg-bordure"}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
