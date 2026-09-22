"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARQUE } from "@/content/marque";
import { ETAPES_TOTAL, etapeDepuisChemin } from "@/lib/tunnel/livret";
import { IconeRetour } from "./icones";

/** La page précédente dans le livret, déduite de l'URL. */
function pagePrecedente(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  // Le reçu renvoie au sujet, pas à la fiche déjà envoyée.
  const retrait = segments.at(-1) === "envoyee" ? 2 : 1;
  return "/" + segments.slice(0, -retrait).join("/");
}

/**
 * L'en-tête du livret : le lockup, l'étape en cours et le retour. Il reste en
 * place pendant les changements de page (`view-transition-name: entete`).
 */
export function Entete() {
  const pathname = usePathname();
  const etape = etapeDepuisChemin(pathname);
  const precedente = pagePrecedente(pathname);

  return (
    <header
      style={{ viewTransitionName: "entete" }}
      className="fixed inset-x-0 top-0 z-(--z-entete) h-(--hauteur-entete) bg-nuit/92 backdrop-blur-md livret:bg-transparent livret:backdrop-blur-none"
    >
      <div className="flex h-full items-center gap-4 pr-(--gouttiere) pl-(--gouttiere) livret:pl-(--reliure)">
        {precedente !== null && (
          <Link
            href={precedente}
            transitionTypes={["page-arriere"]}
            className="-ml-3 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-encre-douce transition-colors hover:text-encre"
          >
            <IconeRetour className="size-5" />
            <span className="sr-only">{MARQUE.interface.retour}</span>
          </Link>
        )}
        <Link
          href="/"
          transitionTypes={["page-arriere"]}
          aria-label={MARQUE.interface.accueil}
          className="inline-flex h-11 items-center"
        >
          <Image
            src={MARQUE.logo.src}
            width={MARQUE.logo.largeur}
            height={MARQUE.logo.hauteur}
            alt=""
            loading="eager"
            sizes="140px"
            className="h-6 w-auto livret:h-7"
          />
        </Link>
        <p aria-hidden="true" className="ml-auto flex items-baseline gap-2 font-titre text-mention text-encre-sourde">
          <span className="tabular-nums text-encre-douce">
            {etape}/{ETAPES_TOTAL}
          </span>
          <span className="hidden sm:inline">
            {MARQUE.interface.etapes[etape - 1]}
          </span>
        </p>
      </div>
    </header>
  );
}
