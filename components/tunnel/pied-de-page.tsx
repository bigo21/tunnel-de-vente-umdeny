import Image from "next/image";
import { MARQUE } from "@/content/marque";

export function PiedDePage() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-[18px] border-t border-bordure px-[clamp(16px,4vw,52px)] py-[clamp(22px,3vw,34px)]">
      <Image
        src={MARQUE.logo.src}
        alt={MARQUE.nom}
        width={MARQUE.logo.largeur}
        height={MARQUE.logo.hauteur}
        className="h-[22px] w-auto"
      />
      <span className="font-texte text-[13px] leading-relaxed text-encre-faible">
        {MARQUE.piedDePage}{" "}
        <a href="#" className="underline underline-offset-2 hover:text-accent-clair">
          Mentions légales
        </a>{" "}
        ·{" "}
        <a href="#" className="underline underline-offset-2 hover:text-accent-clair">
          Confidentialité
        </a>
      </span>
    </footer>
  );
}
