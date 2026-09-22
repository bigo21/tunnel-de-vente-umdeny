/**
 * Tout le texte propre à la marque Umdeny Capital.
 *
 * La version Vireel remplace ce fichier et les tokens de `app/globals.css` ;
 * les composants du tunnel n'y touchent pas. Aucune offre, aucun chiffre,
 * aucun rendement et aucun témoignage ne doit être ajouté ici sans source
 * client.
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

  /** Couleur de la barre du navigateur mobile : le bleu nuit de la charte. */
  couleurNavigateur: "#030929",

  meta: {
    titre: "Parcours de l'écosystème Umdeny Capital",
    description:
      "Des activités concrètes, un film court par sujet, un conseiller qui vous rappelle sous 48 heures ouvrées. Aucun versement sur ce site : tout passe par un contrat écrit.",
  },

  couverture: {
    titre: "Le capital placé là où l'économie se fabrique.",
    chapeau:
      "Trois temps : un film d'accueil, votre profil, puis le sujet qui vous intéresse. Vos coordonnées ne sont demandées qu'à la fin.",
    /** Titre du choix de branche, lu par les lecteurs d'écran seulement. */
    choisir: "Choisir votre parcours",
    /** Les trois engagements, en une ligne, dans le premier écran. */
    garanties: ["Aucun versement sur ce site", "Contrat écrit", "Rappel sous 48 h ouvrées"],
    /** Film d'accueil. Big Buck Bunny, vidéo de test, à remplacer. */
    film: {
      titre: "Le groupe en quatre-vingt-dix secondes",
      video: { id: "aqz-KE-bpKQ", duree: "1 min 30" },
    },
    /**
     * Phrase révélée mot à mot dans la section épinglée. Elle répond d'emblée
     * à « qu'est-ce que je signe ? ».
     */
    engagement:
      "Rien ne se verse sur ce site. Un conseiller vous appelle, vous lisez les conditions, et rien ne se fait sans contrat écrit.",
    /** Mots de la phrase qui prennent l'or une fois révélés. Un seul signal. */
    engagementSignal: "contrat écrit.",
    cloture: "Choisissez votre parcours.",
  },

  /**
   * Les règles du groupe, en réglure. Reprises des engagements du brief ;
   * elles apparaissent sur la couverture, à côté de chaque sujet et sur la
   * fiche de demande.
   */
  conditions: [
    { libelle: "Versement demandé sur ce site", valeur: "Aucun" },
    { libelle: "Engagement", valeur: "Par contrat écrit, après un entretien" },
    { libelle: "Rappel d'un conseiller", valeur: "Sous 48 h ouvrées" },
  ],

  sommaire: {
    /** `{n}` est remplacé par le nombre de films de la branche. */
    compte: "{n} films courts",
    /** Légende sous le nombre, dans l'onglet d'index. */
    films: "films",
    changer: "Voir aussi :",
    regarder: "Voir le film",
    /** Consigne sous le titre du sommaire : le film d'abord. */
    guide: "Un film court par sujet. Choisissez celui qui vous parle.",
    apercu: "Aperçu du film",
  },

  sujet: {
    retour: "Tous les films",
    lire: "Lire le film",
    fermer: "Fermer le film",
    contexte: "Contexte",
    probleme: "Problème",
    solution: "Solution",
    engagementTitre: "Ce que vous signerez",
    engagementTexte:
      "Rien aujourd'hui. Votre demande déclenche un appel, puis des conditions écrites que vous êtes libre de refuser.",
    /** Consigne sous le titre d'un sujet : c'est le film qui explique. */
    guide: "Commencez par le film : il explique l'essentiel. Le texte ci-dessous le résume.",
    action: "Demander un rappel",
    /** Action principale quand le formulaire est déjà en ligne ailleurs. */
    actionExterne: "Remplir le formulaire",
    /** `{domaine}` : le site qui héberge le formulaire. */
    mentionExterne: "Formulaire hébergé sur {domaine}, dans un nouvel onglet.",
    /** Sous le bouton principal : l'objet de la demande. `{objet}` : libellé. */
    objetAction: "Objet : {objet}",
    autresDemandes: "Ou, pour ce sujet :",
    suivant: "Film suivant",
    precedent: "Film précédent",
  },

  demande: {
    titre: "Inscrire votre demande",
    chapeau: "Quatre réponses, une minute. Un conseiller vous rappelle sous 48 heures ouvrées.",
    objet: "Votre demande",
    nom: "Nom et prénom",
    telephone: "Téléphone",
    aideTelephone: "Avec l'indicatif du pays. C'est ce numéro qui sera appelé.",
    consentement:
      "J'accepte d'être contacté par Umdeny Capital au sujet de cette demande.",
    facultatif: "Préciser votre demande (facultatif)",
    email: "Adresse e-mail",
    aideEmail: "Pour recevoir le récapitulatif par écrit.",
    ville: "Ville",
    echeance: "Quand souhaitez-vous en parler ?",
    echeances: ["Dans les 15 jours", "Dans le mois", "Dans les trois mois", "Je ne sais pas encore"],
    obligatoire: "obligatoire",
    envoyer: "Envoyer ma demande",
    envoi: "Envoi de votre demande…",
    ensuite: "Ce qui se passe ensuite",
    mentionDonnees:
      "Aucun versement n'est demandé à cette étape. Vos données servent uniquement au traitement de votre demande et ne sont pas cédées à des tiers.",
    brouillon: "Vos réponses sont gardées sur cet appareil tant que la demande n'est pas envoyée.",
    erreurs: {
      resume: "La demande n'est pas encore complète :",
      nom: "Indiquez votre nom pour que le conseiller sache qui appeler.",
      telephone: "Indiquez un numéro de téléphone.",
      telephoneFormat:
        "Ce numéro semble incomplet : écrivez au moins 8 chiffres, indicatif compris.",
      qualification: "Choisissez une réponse, même « Je préfère en parler ».",
      consentement: "Cochez la case pour autoriser l'appel du conseiller.",
      email: "Cette adresse e-mail semble incomplète. Vous pouvez aussi la laisser vide.",
      envoi:
        "La demande n'est pas partie. Vérifiez votre connexion puis réessayez : vos réponses sont conservées.",
    },
  },

  recu: {
    titre: "Votre demande est enregistrée.",
    tampon: "Enregistrée",
    /** Reçu d'une demande de document : ce qui change par rapport au rappel. */
    document: {
      titre: "Votre demande de document est enregistrée.",
      texte:
        "Merci {prenom}. Le document vous est envoyé, et un conseiller vous rappelle sous 48 heures ouvrées au numéro indiqué.",
      titreDemo: "Votre demande de document est prête à être transmise.",
      texteDemo:
        "Merci {prenom}. Une fois la transmission branchée, le document vous sera envoyé et un conseiller vous rappellera sous 48 heures ouvrées.",
    },
    /** `{prenom}` : premier mot du nom saisi. */
    texte:
      "Merci {prenom}. Un conseiller Umdeny Capital vous rappelle sous 48 heures ouvrées au numéro indiqué.",
    /** Tant que l'envoi n'est pas branché (`ENVOI_BRANCHE`), le reçu ne
     *  prétend pas que la demande est enregistrée. */
    titreDemo: "Votre demande est prête à être transmise.",
    tamponDemo: "Démonstration",
    texteDemo:
      "Merci {prenom}. Une fois la transmission branchée, un conseiller Umdeny Capital vous rappellera sous 48 heures ouvrées au numéro indiqué.",
    objet: "Objet",
    sujet: "Sujet",
    numero: "Numéro à rappeler",
    delai: "Délai",
    delaiValeur: "Sous 48 h ouvrées",
    suitesTitre: "Ce qui se passe ensuite",
    suites: [
      "Un email de confirmation avec le récapitulatif de vos réponses, si vous avez laissé une adresse.",
      "Un appel du conseiller, qui précise le véhicule adapté à votre situation.",
      "Des conditions écrites — montant, durée, rémunération, sortie — avant tout versement.",
    ],
    retour: "Revenir aux films",
    /** Affiché tant que `ENVOI_BRANCHE` vaut `false` dans lib/tunnel/envoi.ts. */
    envoiProvisoire:
      "Version de démonstration : la transmission des demandes au conseiller n'est pas encore branchée.",
    absent: {
      titre: "Aucune demande envoyée depuis cet appareil.",
      texte:
        "Ce reçu n'apparaît qu'après l'envoi d'une demande. Vous pouvez la remplir maintenant : cela prend une minute.",
      action: "Inscrire une demande",
    },
  },

  interface: {
    evitement: "Aller au contenu",
    accueil: "Umdeny Capital, retour à la couverture",
    progression: "Progression",
    /** `{n}` et `{total}` : étape courante et nombre d'étapes. */
    etape: "Étape {n} sur {total}",
    etapes: ["Votre profil", "Les films", "Votre demande", "Reçu"],
    retour: "Retour",
  },

  lecteur: {
    provisoire: "Film provisoire",
    /** Vignette du sommaire, en attendant les illustrations du client. */
    imageProvisoire: "Image provisoire",
    mentionImageProvisoire:
      "Image de test : l'illustration définitive reste à fournir.",
    mentionProvisoire:
      "Vidéo de test : le film définitif reste à livrer.",
    chargement: "Chargement du lecteur…",
    /** `{titre}` : titre du sujet. */
    libelleLecture: "Lire le film « {titre} », {duree}",
  },

  introuvable: {
    titre: "Cette page ne figure pas dans le livret.",
    texte: "Le lien est peut-être incomplet. Reprenez depuis la couverture.",
    action: "Revenir à la couverture",
  },

  piedDePage: {
    groupe: "Umdeny Capital — parcours de l'écosystème.",
    /**
     * Le visiteur arrive le plus souvent depuis les réseaux sociaux animés par
     * Vireel : cette ligne relie les deux noms pour qu'il sache où il est.
     */
    visibilite: "Vous nous avez peut-être découverts par Vireel : c'est la marque qui anime nos réseaux sociaux.",
    mention:
      "Ce site ne recueille aucun paiement. Toute opération fait l'objet d'un contrat écrit, remis après un entretien avec un conseiller.",
  },
} as const;

/** Remplace les `{cle}` d'un gabarit de texte. */
export function remplir(
  gabarit: string,
  valeurs: Record<string, string | number>,
): string {
  return gabarit.replace(/\{(\w+)\}/g, (_, cle: string) =>
    String(valeurs[cle] ?? ""),
  );
}
