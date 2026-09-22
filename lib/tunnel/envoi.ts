import type { ContexteDemande, Demande } from "./types";

/**
 * Point d'extension unique pour la soumission de la demande.
 *
 * Rien n'est envoyé nulle part pour l'instant : la destination (email, CRM,
 * base de données) n'est pas arrêtée. Le reçu s'affiche donc sur la seule
 * validation locale.
 *
 * Quand la destination sera connue, c'est ce corps de fonction qui change —
 * en Server Function (`"use server"`) ou en appel de route handler. La fiche
 * gère déjà l'état d'attente et l'échec (rejeter la promesse suffit).
 */
/**
 * La demande part-elle vraiment quelque part ? Tant que ce n'est pas le cas,
 * le reçu le dit, comme les films provisoires. Passer à `true` le jour où
 * `envoyerDemande` est branchée.
 */
export const ENVOI_BRANCHE = false;

export async function envoyerDemande(
  _demande: Demande,
  _contexte: ContexteDemande,
): Promise<void> {
  return;
}

export type ChampVerifie =
  | "nom"
  | "telephone"
  | "qualification"
  | "consentement"
  | "email";

export type MotifErreur =
  | "nom"
  | "telephone"
  | "telephoneFormat"
  | "qualification"
  | "consentement"
  | "email";

/**
 * Vérifie la demande et rend, champ par champ, le motif de l'erreur.
 *
 * Obligatoires : nom, téléphone, réponse de qualification, consentement.
 * Le reste est facultatif pour ne pas perdre le visiteur sur une fiche trop
 * exigeante ; l'email n'est contrôlé que s'il est rempli.
 */
export function verifierDemande(
  demande: Demande,
): Partial<Record<ChampVerifie, MotifErreur>> {
  const erreurs: Partial<Record<ChampVerifie, MotifErreur>> = {};

  if (demande.nom.trim().length < 2) erreurs.nom = "nom";

  const chiffres = demande.telephone.replace(/\D/g, "");
  if (demande.telephone.trim() === "") erreurs.telephone = "telephone";
  else if (chiffres.length < 8) erreurs.telephone = "telephoneFormat";

  if (demande.qualification === "") erreurs.qualification = "qualification";
  if (!demande.consentement) erreurs.consentement = "consentement";

  const email = demande.email.trim();
  if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    erreurs.email = "email";
  }

  return erreurs;
}

export const DEMANDE_VIDE: Demande = {
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  qualification: "",
  echeance: "",
  consentement: false,
};

/**
 * Mémoire locale de la demande : le brouillon (pour une connexion qui lâche en
 * cours de saisie) et le reçu (lu par la page de confirmation). Tout reste dans
 * `sessionStorage`, rien ne quitte l'appareil.
 */
const CLE_BROUILLON = "livret:brouillon";
export const CLE_RECU = "livret:recu";

export type Recu = {
  nom: string;
  telephone: string;
  objet: string;
  parcours: string;
  sujet: string;
};

function lire<T>(cle: string): T | null {
  try {
    const brut = window.sessionStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : null;
  } catch {
    return null;
  }
}

function ecrire(cle: string, valeur: unknown) {
  try {
    if (valeur === null) window.sessionStorage.removeItem(cle);
    else window.sessionStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // Navigation privée ou stockage plein : le tunnel fonctionne sans.
  }
}

export const memoire = {
  lireBrouillon: (sujet: string) =>
    lire<Demande & { sujet: string }>(CLE_BROUILLON)?.sujet === sujet
      ? lire<Demande>(CLE_BROUILLON)
      : null,
  ecrireBrouillon: (sujet: string, demande: Demande) =>
    ecrire(CLE_BROUILLON, { ...demande, sujet }),
  effacerBrouillon: () => ecrire(CLE_BROUILLON, null),
  lireRecu: () => lire<Recu>(CLE_RECU),
  ecrireRecu: (recu: Recu) => ecrire(CLE_RECU, recu),
};
