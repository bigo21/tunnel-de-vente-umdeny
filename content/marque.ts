/**
 * Tout le contenu propre à la marque Vireel.
 *
 * La version Umdeny Capital remplace ce fichier et les tokens de
 * `app/globals.css` ; les composants du tunnel n'y touchent pas.
 */

export const MARQUE = {
  nom: "Vireel",

  logo: {
    /** Mot-symbole en blanc, pour le fond sombre du parcours. */
    src: "/marque/logo-blanc.png",
    largeur: 1681,
    hauteur: 344,
  },

  accueil: {
    titre: "Regardez. Puis choisissez votre parcours.",
    intro:
      "Deux minutes de vidéo, une question à la fois. Vous ne laissez vos coordonnées qu'à la toute fin.",
    libelleVideo: "Vidéo d'accueil — 90 s · emplacement à remplir",
    reperVideo: "01 · Bienvenue",
  },

  menu: {
    intro: "Une vidéo par sujet. Le texte vient après, en soutien.",
  },

  formulaire: {
    intro:
      "Six champs. Un conseiller reprend vos réponses sous 48 heures ouvrées.",
    consentement: "J'accepte d'être contacté par Vireel au sujet de cette demande.",
    erreur:
      "Merci de renseigner votre nom, votre téléphone et d'accepter d'être contacté.",
    mentionDonnees:
      "Aucun versement n'est demandé à cette étape. Vos données servent uniquement au traitement de votre demande.",
  },

  confirmation: {
    titre: "Félicitations, votre demande est enregistrée.",
    /** `{demande}` est remplacé par le libellé du formulaire envoyé. */
    texte:
      "Nous avons bien reçu votre demande « {demande} ». Un conseiller Vireel vous rappelle sous 48 heures ouvrées.",
    suites: [
      "Vous recevez un email de confirmation avec le récapitulatif.",
      "Un conseiller vous appelle et précise le véhicule adapté.",
      "Conditions écrites avant tout versement, sans exception.",
    ],
  },

  /**
   * Règle produit : ces liens n'existent que sur l'écran de confirmation, et
   * nulle part ailleurs dans le tunnel.
   *
   * Les deux valeurs viennent de l'environnement pour pouvoir différer entre
   * la preview et la production. Tant qu'elles ne sont pas renseignées, l'écran
   * affiche les blocs en état « à fournir » plutôt que de faux liens.
   */
  whatsapp: {
    conseiller: process.env.NEXT_PUBLIC_WHATSAPP_CONSEILLER || null,
    chaine: process.env.NEXT_PUBLIC_WHATSAPP_CHAINE || null,
    titre: "Continuer sur WhatsApp",
    libelleConseiller: "Écrire à un conseiller",
    libelleChaine: "Rejoindre la chaîne de suivi Vireel",
    mentionAFournir:
      "Numéro et lien de chaîne à renseigner par Vireel. Ces liens n'apparaissent que sur cet écran.",
  },

  lecteur: {
    titre: "Lecteur vidéo — contenu à fournir",
    mention:
      "L'emplacement reste marqué comme temporaire jusqu'à la livraison des vidéos définitives.",
  },
} as const;
