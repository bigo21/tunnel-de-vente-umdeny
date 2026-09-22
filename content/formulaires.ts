import type { Formulaire } from "@/lib/tunnel/types";

/**
 * Les formulaires du parcours.
 *
 * La plupart existent déjà sur d'autres sites du groupe : le tunnel s'y rend
 * par un lien, et ces sites gèrent eux-mêmes leur page de confirmation. Seules
 * les demandes de document sont remplies sur le tunnel, qui affiche alors son
 * propre reçu — le seul écran où WhatsApp apparaît.
 *
 * Ajouter `lien` à un formulaire le fait basculer côté site externe ; le
 * retirer le ramène sur le tunnel. Rien d'autre n'est à changer.
 */
export const FORMULAIRES = {
  profil: {
    cle: "profil",
    libelle: "Vérifier mon profil investisseur",
    lien: "https://quizz.umdeny.com",
  },
  cotationWifi: {
    cle: "cotation-wifi",
    libelle: "Demande de cotation WiFi Zone",
    lien: "https://www.cherryz.tech/demandes/wifi-zone",
  },
  apporteur: {
    cle: "apporteur",
    libelle: "Formulaire apporteur d'affaires",
    lien: "https://www.umdeny.com/apporteur-affaires",
  },
  documentMobileMoney: {
    cle: "document-mobile-money",
    libelle: "Recevoir le document Distributeur Mobile Money",
  },
  documentWifi: {
    cle: "document-wifi",
    libelle: "Recevoir le document Borne WiFi Zone",
  },
} as const satisfies Record<string, Formulaire>;
