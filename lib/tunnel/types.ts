import type { Video } from "./video";

/**
 * Types du tunnel de vente. Volontairement indépendants de la marque : la
 * version Vireel réutilise ces structures et ne remplace que le contenu
 * (`content/`) et les tokens de charte (`app/globals.css`).
 */

export type CleParcours = "investisseur" | "apporteur";

/**
 * Un formulaire proposé à la fin d'un sujet.
 *
 * Deux cas, et c'est la présence de `lien` qui les distingue :
 * - **interne** : le formulaire est rempli sur le tunnel, qui affiche ensuite
 *   son propre reçu ;
 * - **externe** : le formulaire existe déjà sur un autre site du groupe ; le
 *   tunnel n'y renvoie que par un lien, et la confirmation est gérée là-bas.
 */
export type Formulaire = {
  cle: string;
  libelle: string;
  /** Adresse du formulaire déjà en ligne. Absent = formulaire du tunnel. */
  lien?: string;
};

/** Un sujet du parcours : une vidéo, un triptyque rédigé, et ses formulaires. */
export type Theme = {
  cle: string;
  /** Mot-clé du sujet, affiché en étiquette (GAB, WiFi Zone…). */
  etiquette: string;
  /**
   * Illustration de l'encart, à fournir par le client. Tant qu'elle manque,
   * le sommaire retombe sur la miniature du film, marquée provisoire.
   */
  illustration?: { src: string; alt: string };
  /** La vidéo YouTube du sujet : identifiant et durée annoncée. */
  video: Video;
  titre: string;
  accroche: string;
  contexte: string;
  probleme: string;
  solution: string;
  /**
   * Les formulaires du sujet. Le premier est l'action principale et prend le
   * bouton or.
   */
  formulaires: [Formulaire, ...Formulaire[]];
};

export type Parcours = {
  cle: CleParcours;
  /** Surtitre affiché en haut de chaque écran du parcours. */
  libelle: string;
  titreMenu: string;
  /** Ce que la branche annonce sur l'écran d'accueil. */
  carteAccueil: {
    titre: string;
    accroche: string;
    action: string;
  };
  /** Intitulé de la question de qualification du formulaire. */
  questionQualification: string;
  optionsQualification: [string, ...string[]];
  themes: [Theme, ...Theme[]];
};

/** Les champs de la demande : quatre obligatoires, trois facultatifs. */
export type Demande = {
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  qualification: string;
  echeance: string;
  consentement: boolean;
};

/** Contexte accompagnant la demande, utile au futur envoi côté serveur. */
export type ContexteDemande = {
  parcours: CleParcours;
  theme: string;
  formulaire: string;
};
