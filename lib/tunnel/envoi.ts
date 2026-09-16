import type { ContexteDemande, Demande } from "./types";

/**
 * Point d'extension unique pour la soumission du formulaire.
 *
 * Rien n'est envoyé nulle part pour l'instant : la destination (email, CRM,
 * base de données) n'est pas arrêtée. L'écran de confirmation s'affiche donc
 * sur la seule validation locale.
 *
 * Quand la destination sera connue, c'est ce corps de fonction qui change —
 * en Server Function (`"use server"`) ou en appel de route handler. Les
 * composants du tunnel gèrent déjà l'état d'attente et l'échec.
 */
export async function envoyerDemande(
  _demande: Demande,
  _contexte: ContexteDemande,
): Promise<void> {
  return;
}

/**
 * Validation minimale, alignée sur la maquette : nom, téléphone et
 * consentement. Les autres champs restent facultatifs pour ne pas perdre le
 * prospect sur un formulaire trop exigeant.
 */
export function demandeComplete(demande: Demande): boolean {
  return (
    demande.nom.trim() !== "" &&
    demande.telephone.trim() !== "" &&
    demande.consentement
  );
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
