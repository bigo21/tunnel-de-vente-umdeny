/**
 * Tout le contenu propre à la marque Umdeny Capital.
 *
 * La version Vireel remplace ce fichier et les tokens de `app/globals.css` ;
 * les composants du tunnel n'y touchent pas.
 */

export const MARQUE = {
  nom: "Umdeny Capital",

  logo: {
    /** Lockup blanc, pour le bleu nuit de la charte. */
    src: "/marque/lockup-blanc.png",
    largeur: 3463,
    hauteur: 943,
  },
  symbole: {
    src: "/marque/symbole.png",
    largeur: 1680,
    hauteur: 1385,
  },

  accueil: {
    surtitre: "Groupe Umdeny Capital · Vireel, filiale opérationnelle",
    titre: "Le capital placé là où l'économie se fabrique.",
    intro:
      "Regardez d'abord, lisez ensuite. Chaque sujet tient dans une vidéo courte ; le texte n'est là que pour préciser. Vos coordonnées ne sont demandées qu'à la dernière étape.",
    libelleVideo: "Film d'introduction · 90 secondes",
    /** Un seul de ces chiffres est mis en or par écran — voir la charte. */
    chiffresCles: [
      { valeur: "04", legende: "activités opérées ou financées par le groupe." },
      { valeur: "48 h", legende: "le délai d'appel après votre demande, jours ouvrés." },
      {
        valeur: "0",
        legende: "versement demandé sur ce site : tout passe par un contrat écrit.",
      },
    ],
  },

  formulaire: {
    intro:
      "Six champs. Un conseiller Umdeny Capital reprend vos réponses sous 48 heures ouvrées.",
    consentement:
      "J'accepte d'être contacté par Umdeny Capital au sujet de cette demande.",
    erreur:
      "Merci de renseigner votre nom, votre téléphone et d'accepter d'être contacté.",
    mentionDonnees:
      "Aucun versement n'est demandé à cette étape. Vos données servent uniquement au traitement de votre demande et ne sont pas cédées à des tiers.",
  },

  confirmation: {
    titre: "Félicitations, votre demande est enregistrée.",
    /** `{demande}` est remplacé par le libellé du formulaire envoyé. */
    texte:
      "Nous avons bien reçu votre demande « {demande} ». Un conseiller vous rappelle sous 48 heures ouvrées sur le numéro indiqué.",
    suites: [
      "Un email de confirmation avec le récapitulatif de vos réponses.",
      "Un appel du conseiller, qui précise le véhicule adapté à votre situation.",
      "Des conditions écrites — montant, durée, rémunération, sortie — avant tout versement.",
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
    libelleConseiller: "Écrire à un conseiller",
    libelleChaine: "Rejoindre la chaîne de suivi Umdeny Capital",
    mentionAFournir:
      "Numéro et lien de chaîne à renseigner. Ces deux liens n'apparaissent que sur cet écran, après envoi.",
  },

  piedDePage: "Umdeny Capital — Vireel est une filiale du groupe.",

  lecteur: {
    titre: "Lecteur vidéo — contenu à fournir",
    mention:
      "L'emplacement reste marqué comme temporaire jusqu'à la livraison des films définitifs.",
  },
} as const;
