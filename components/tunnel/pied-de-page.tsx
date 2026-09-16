import Image from "next/image";
import { MARQUE } from "@/content/marque";

/**
 * Les liens légaux gardent 44px de haut à toutes les tailles : une cible
 * tactile ne doit pas dépendre d'une détection de pointeur, qui se trompe sur
 * les portables tactiles.
 */
const LIEN =
  "inline-flex min-h-11 items-center underline underline-offset-2 hover:text-accent-clair";

export function PiedDePage() {
  return (
    <footer className="flex flex-col items-start gap-4 border-t border-bordure px-4 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-[18px] sm:px-[clamp(16px,4vw,52px)] sm:py-[clamp(22px,3vw,34px)]">
      <Image
        src={MARQUE.logo.src}
        alt={MARQUE.nom}
        width={MARQUE.logo.largeur}
        height={MARQUE.logo.hauteur}
        className="h-[22px] w-auto"
      />
      <div className="font-texte flex flex-col gap-1 text-[13px] leading-relaxed text-encre-faible sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
        <span>{MARQUE.piedDePage}</span>
        <span className="flex flex-wrap items-center gap-x-4">
          <a href="#" className={LIEN}>
            Mentions légales
          </a>
          <a href="#" className={LIEN}>
            Confidentialité
          </a>
        </span>
      </div>
    </footer>
  );
}
