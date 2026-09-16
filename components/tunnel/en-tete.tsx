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
    <header
      style={{ viewTransitionName: "en-tete" }}
      className="sticky top-0 z-20 flex items-center justify-between gap-[clamp(12px,3vw,28px)] border-b border-bordure bg-fond/92 px-4 py-2.5 backdrop-blur-[10px] sm:px-[clamp(16px,4vw,52px)] sm:py-[13px]"
    >
      <div className="flex min-w-0 items-center gap-[clamp(12px,3vw,22px)]">
        {vue !== "accueil" && (
          <button
            type="button"
            onClick={onRetour}
            className="flex min-h-11 flex-none cursor-pointer items-center border border-bordure-forte px-4 text-[13px] font-medium tracking-[0.04em] transition-[color,border-color,background-color] duration-200 hover:border-accent hover:bg-[rgba(192,143,81,0.08)] hover:text-accent-clair"
          >
            ← Retour
          </button>
        )}
        <Image
          src={MARQUE.logo.src}
          alt={MARQUE.nom}
          width={MARQUE.logo.largeur}
          height={MARQUE.logo.hauteur}
          loading="eager"
          fetchPriority="high"
          className="h-[clamp(22px,3.4vw,30px)] w-auto flex-none"
        />
      </div>

      <div className="flex min-w-0 items-center gap-3">
        {/* Sous 640px, les filets suffisent à situer l'étape : le libellé
            prendrait toute la largeur restante. */}
        <span className="hidden min-w-0 truncate text-[10.5px] uppercase tracking-[0.22em] text-encre-sourde sm:inline">
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
              className="relative h-0.5 w-4 overflow-hidden bg-bordure sm:w-5"
            >
              {/* Le filet se remplit de la gauche vers la droite quand
                  l'étape est atteinte, avec un léger décalage par rang. */}
              <span
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                  transform: `scaleX(${etape >= i + 1 ? 1 : 0})`,
                  transitionDelay: `${i * 60}ms`,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
