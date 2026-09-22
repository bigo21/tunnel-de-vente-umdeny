import { PARCOURS } from "@/content/parcours";
import type { CleParcours, Formulaire, Parcours, Theme } from "./types";

/**
 * Plan du livret : les routes du tunnel et la façon de retrouver un parcours
 * ou un sujet à partir de l'URL. Indépendant de la marque.
 *
 *   /                                  couverture        étape 1
 *   /[parcours]                        sommaire          étape 2
 *   /[parcours]/[sujet]                sujet             étape 2
 *   /[parcours]/[sujet]/demande        fiche de demande  étape 3
 *   /[parcours]/[sujet]/demande/envoyee reçu             étape 4
 */

export const CLES_PARCOURS = Object.keys(PARCOURS) as CleParcours[];

export const ETAPES_TOTAL = 4;

export function trouverParcours(cle: string): Parcours | null {
  return (CLES_PARCOURS as string[]).includes(cle)
    ? PARCOURS[cle as CleParcours]
    : null;
}

export function trouverSujet(
  cleParcours: string,
  cleSujet: string,
): { parcours: Parcours; sujet: Theme; rang: number } | null {
  const parcours = trouverParcours(cleParcours);
  if (!parcours) return null;
  const rang = parcours.themes.findIndex((t) => t.cle === cleSujet);
  if (rang === -1) return null;
  return { parcours, sujet: parcours.themes[rang], rang };
}

/** Les formulaires remplis sur le tunnel (les autres sont des liens sortants). */
export function formulairesInternes(sujet: Theme): Formulaire[] {
  return sujet.formulaires.filter((f) => !f.lien);
}

/** Tous les sujets qui ont au moins un formulaire rempli sur le tunnel. */
export function sujetsAvecFiche(): { parcours: CleParcours; sujet: string }[] {
  return CLES_PARCOURS.flatMap((parcours) =>
    PARCOURS[parcours].themes
      .filter((t) => formulairesInternes(t).length > 0)
      .map((t) => ({ parcours, sujet: t.cle })),
  );
}

/** Le nom de domaine d'un formulaire externe, montré avant de quitter le site. */
export function domaine(lien: string): string {
  try {
    return new URL(lien).hostname.replace(/^www\./, "");
  } catch {
    return lien;
  }
}

export const chemin = {
  couverture: () => "/",
  sommaire: (p: CleParcours) => `/${p}`,
  sujet: (p: CleParcours, s: string) => `/${p}/${s}`,
  demande: (p: CleParcours, s: string, formulaire?: string) =>
    `/${p}/${s}/demande${formulaire ? `?objet=${formulaire}` : ""}`,
  recu: (p: CleParcours, s: string) => `/${p}/${s}/demande/envoyee`,
};

/** Étape affichée par le fil de reliure, déduite de l'URL. */
export function etapeDepuisChemin(pathname: string): number {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return 1;
  if (segments.at(-1) === "envoyee") return 4;
  if (segments.at(-1) === "demande") return 3;
  return 2;
}
