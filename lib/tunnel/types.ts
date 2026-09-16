import type { Video } from "./video";

/**
 * Types du tunnel de vente. Volontairement indépendants de la marque : la
 * version Vireel réutilise ces structures et ne remplace que le contenu
 * (`content/`) et les tokens de charte (`app/globals.css`).
 */

export type CleParcours = "investisseur" | "apporteur";

/** Un sujet du parcours : une vidéo, un triptyque rédigé, et ses formulaires. */
export type Theme = {
  cle: string;
  /** Numéro affiché sur la vignette, sur deux chiffres. */
  numero: string;
  /** La vidéo YouTube du sujet : identifiant et durée annoncée. */
  video: Video;
  titre: string;
  accroche: string;
  contexte: string;
  probleme: string;
  solution: string;
  /**
   * Libellés des formulaires proposés à la fin du sujet. Le premier est
   * l'action principale et prend le bouton or.
   */
  formulaires: [string, ...string[]];
};

export type Parcours = {
  cle: CleParcours;
  /** Surtitre affiché en haut de chaque écran du parcours. */
  libelle: string;
  titreMenu: string;
  /**
   * Repère visuel du parcours, exigé par le brief pour que le visiteur sache
   * toujours dans quelle branche il se trouve.
   */
  teinte: "accent" | "encre";
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

/** Les six champs du formulaire, plus le consentement. */
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
