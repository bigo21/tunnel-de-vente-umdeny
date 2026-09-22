import Link from "next/link";
import { MARQUE, remplir } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { CLES_PARCOURS, chemin } from "@/lib/tunnel/livret";
import type { CleParcours } from "@/lib/tunnel/types";
import { IconeSuite } from "./icones";

/**
 * Les onglets d'index du livret : une entrée par branche du tunnel.
 *
 * Une ligne par branche, sur la réglure. Le nombre de films est l'onglet
 * lui-même, en bout de ligne.
 */
export function Onglets({
  actif,
  titreNiveau = "h2",
  compact = false,
  className = "",
}: {
  actif?: CleParcours;
  /** Rappel en fin de page : titre et nombre de films, sans accroche. */
  compact?: boolean;
  titreNiveau?: "h2" | "h3";
  className?: string;
}) {
  const Titre = titreNiveau;
  return (
    <ul className={`border-b border-reglure ${className}`}>
      {CLES_PARCOURS.map((cle) => {
        const parcours = PARCOURS[cle];
        const courant = cle === actif;
        return (
          <li key={cle} className="regle">
            <Link
              href={chemin.sommaire(cle)}
              transitionTypes={["page-avant"]}
              aria-current={courant ? "page" : undefined}
              className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 py-5 pr-1 transition-colors livret:py-6"
            >
              <span>
                <Titre className="font-titre text-intertitre font-normal text-encre transition-colors group-hover:text-or-clair">
                  {parcours.carteAccueil.titre}
                </Titre>
                {!compact && (
                  <span className="mt-1.5 block max-w-[46ch] text-[0.9375rem] leading-snug text-encre-douce">
                    {parcours.carteAccueil.accroche}
                  </span>
                )}
                <span className="mt-3 inline-flex items-center gap-2 font-titre text-mention font-medium text-or-clair">
                  {parcours.carteAccueil.action}
                  <IconeSuite className="size-4 transition-transform duration-300 ease-livre group-hover:translate-x-1" />
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex h-full min-h-20 w-14 flex-col items-center justify-center border-l border-reglure font-titre text-encre-douce transition-colors duration-300 group-hover:border-or group-hover:text-or-clair livret:w-20 livret:bg-nuit-releve"
              >
                <span className="text-[1.625rem] leading-none font-light tabular-nums">
                  {parcours.themes.length}
                </span>
                <span className="mt-1 text-[0.6875rem] tracking-[0.12em] uppercase">
                  {MARQUE.sommaire.films}
                </span>
              </span>
              <span className="sr-only">
                {remplir(MARQUE.sommaire.compte, { n: parcours.themes.length })}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
