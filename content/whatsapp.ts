/**
 * Liens WhatsApp d'Umdeny Capital.
 *
 * Règle produit : ces liens et leurs libellés n'existent que sur le reçu,
 * après l'envoi d'une demande. Ils vivent dans ce module à part pour que seul
 * le reçu l'importe : aucune autre page du tunnel ne le charge, pas même dans
 * son code.
 *
 * Les deux adresses viennent de l'environnement pour pouvoir différer entre la
 * preview et la production. Tant qu'elles ne sont pas renseignées, le reçu
 * affiche les blocs en état « à fournir » plutôt que de faux liens.
 */
export const WHATSAPP = {
  conseiller: process.env.NEXT_PUBLIC_WHATSAPP_CONSEILLER || null,
  chaine: process.env.NEXT_PUBLIC_WHATSAPP_CHAINE || null,
  titre: "En attendant l'appel",
  libelleConseiller: "Écrire à un conseiller sur WhatsApp",
  libelleChaine: "Rejoindre la chaîne de suivi Umdeny Capital",
  mentionAFournir: "Lien à fournir par Umdeny Capital.",
} as const;
