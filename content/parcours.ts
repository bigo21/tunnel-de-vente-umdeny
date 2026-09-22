import type { CleParcours, Parcours } from "@/lib/tunnel/types";

/**
 * Les deux branches du tunnel et leurs sujets, repris de la maquette
 * « Parcours Umdeny Capital ».
 *
 * Les textes Contexte / Problème / Solution sont encore indicatifs : la
 * rédaction définitive est en cours côté client. Leur longueur est en
 * revanche représentative et sert de garde-fou à la mise en page.
 */
export const PARCOURS: Record<CleParcours, Parcours> = {
  investisseur: {
    cle: "investisseur",
    libelle: "Parcours investisseur",
    titreMenu: "Cinq opportunités, cinq films courts.",
    carteAccueil: {
      titre: "Je suis investisseur",
      accroche:
        "Cinq vidéos, cinq façons d'engager votre capital dans l'écosystème.",
      action: "Voir les cinq films",
    },
    questionQualification: "Montant que vous envisagez de placer",
    optionsQualification: [
      "Moins de 500 000 FCFA",
      "500 000 à 2 millions FCFA",
      "2 à 10 millions FCFA",
      "Plus de 10 millions FCFA",
      "Je préfère en parler",
    ],
    themes: [
      {
        cle: "ecosysteme",
        numero: "01",
        video: { id: "TLkA0RELQ1g", duree: "1 min 30" },
        titre: "L'écosystème Umdeny Capital",
        accroche:
          "Comment quatre activités du groupe se financent et s'alimentent entre elles.",
        contexte:
          "L'épargne disponible est nombreuse, les véhicules lisibles beaucoup moins : entre le livret qui ne rapporte rien et les promesses invérifiables, il manque une offre adossée à des activités que l'on peut aller voir.",
        probleme:
          "Opacité des conditions, ticket d'entrée hors de portée, et personne pour expliquer ce que l'on signe réellement.",
        solution:
          "Umdeny Capital opère ou finance quatre activités — dont celles portées par sa filiale Vireel — avec des conditions écrites et un entretien de qualification avant tout engagement.",
        formulaires: ["Vérifier mon profil investisseur"],
      },
      {
        cle: "mobile-money",
        numero: "02",
        video: { id: "Y-rmzh0PI3c", duree: "2 min" },
        titre: "Distributeur Mobile Money",
        accroche:
          "Financer un point de distribution opéré par Vireel, être rémunéré sur les commissions.",
        contexte:
          "Le paiement mobile est devenu le premier moyen de transfert de la région : chaque quartier a besoin de points de dépôt et de retrait approvisionnés en liquidité toute la journée.",
        probleme:
          "Ouvrir un point demande un fonds de roulement permanent et une présence quotidienne. Beaucoup ont l'emplacement sans le capital, ou le capital sans le temps.",
        solution:
          "Vous financez le fonds de roulement d'un point exploité par Vireel. Exploitation, trésorerie et reporting sont pris en charge ; votre rémunération suit les commissions encaissées, détaillées chaque mois.",
        formulaires: [
          "Vérifier mon profil investisseur",
          "Recevoir le document détaillé",
        ],
      },
      {
        cle: "wifi",
        numero: "03",
        video: { id: "WhWc3b3KhnY", duree: "1 min 45" },
        titre: "Borne WiFi Zone",
        accroche:
          "Équiper un lieu de passage en accès payant et percevoir une part des connexions.",
        contexte:
          "Marchés, gares routières, campus, quartiers résidentiels : la demande de connexion est continue, quand les forfaits mobiles restent chers à l'usage prolongé.",
        probleme:
          "Une borne suppose du matériel, un abonnement de gros et une maintenance régulière — hors de portée d'un particulier isolé.",
        solution:
          "Vireel déploie et maintient les bornes. Vous financez une ou plusieurs zones et percevez une part des connexions vendues, avec un relevé borne par borne.",
        formulaires: ["Vérifier mon profil investisseur", "Demande de cotation"],
      },
      {
        cle: "financement-participatif",
        numero: "04",
        video: { id: "SkVqJ1SGeL0", duree: "2 min 10" },
        titre: "Financement participatif",
        accroche:
          "Prêter à des entreprises instruites par le groupe, avec échéancier et garanties écrites.",
        contexte:
          "Des PME rentables mais jeunes n'obtiennent pas de crédit bancaire faute d'antériorité comptable, alors qu'elles ont des commandes signées à financer.",
        probleme:
          "Le prêt direct se fait souvent sans analyse ni document : l'argent circule, le risque n'est pas mesuré, le remboursement n'est pas encadré.",
        solution:
          "Umdeny Capital instruit chaque dossier, fixe l'échéancier et les garanties, puis ouvre le financement à plusieurs prêteurs. Vous lisez le dossier complet avant de vous positionner.",
        formulaires: ["Recevoir un dossier de financement"],
      },
      {
        cle: "bourse",
        numero: "05",
        video: { id: "R6MlUcmOul8", duree: "2 min" },
        titre: "Bourse — actions, obligations, ETF",
        accroche:
          "Être accompagné pour ouvrir un compte-titres et tenir une méthode dans la durée.",
        contexte:
          "Les marchés cotés sont accessibles depuis un téléphone, mais le vocabulaire, la fiscalité et le choix des supports découragent la plupart des primo-investisseurs.",
        probleme:
          "Sans méthode, on achète au plus haut et on vend dans la panique. Le risque n'est pas le marché, c'est l'improvisation.",
        solution:
          "Accompagnement à l'ouverture, horizon et répartition définis avec vous, points d'étape réguliers — les décisions restent les vôtres. Risque de perte en capital.",
        formulaires: [
          "Vérifier mon profil investisseur",
          "Accompagnement à l'ouverture de compte",
        ],
      },
    ],
  },

  apporteur: {
    cle: "apporteur",
    libelle: "Parcours apporteur d'affaires",
    titreMenu: "Deux films pour cadrer votre rôle.",
    carteAccueil: {
      titre: "Je suis apporteur d'affaires",
      accroche:
        "Deux vidéos : votre rôle, votre rémunération, et l'offre que vous portez.",
      action: "Voir les deux films",
    },
    questionQualification:
      "Secteur des entreprises que vous pouvez introduire",
    optionsQualification: [
      "Entreprises et administrations",
      "Hôtellerie et santé",
      "Banque et microfinance",
      "Commerce et distribution",
      "Autre secteur",
    ],
    themes: [
      {
        cle: "role-apporteur",
        numero: "01",
        video: { id: "mN0zPOpADL4", duree: "1 min 40" },
        titre: "Le rôle d'apporteur d'affaires",
        accroche:
          "Ce qui est attendu de vous, ce qui vous est versé, et à quel moment.",
        contexte:
          "Les décisions d'équipement des entreprises se prennent encore par recommandation : un contact bien placé fait gagner des mois à un fournisseur sérieux.",
        probleme:
          "Beaucoup d'apporteurs travaillent sans cadre : commission promise à l'oral, périmètre flou, aucune trace de qui a amené quoi. La relation s'abîme au premier désaccord.",
        solution:
          "Une convention d'apport signée, une fiche de contact horodatée à chaque introduction, une commission versée sur facture encaissée, et le suivi de vos dossiers.",
        formulaires: ["Devenir apporteur d'affaires"],
      },
      {
        cle: "ip-dedie",
        numero: "02",
        video: { id: "_cMxraX_5RE", duree: "1 min 30" },
        titre: "Internet IP Dédié",
        accroche: "L'offre que vous portez auprès des entreprises, opérée par Vireel.",
        contexte:
          "Banques, cliniques, hôtels, sociétés de services : leur activité s'arrête quand la connexion tombe, et le partagé grand public ne tient pas cette exigence.",
        probleme:
          "Elles paient un débit annoncé qu'elles n'obtiennent qu'aux heures creuses, sans engagement de rétablissement ni interlocuteur technique identifié.",
        solution:
          "Liaison dédiée à débit symétrique garanti, adresse IP fixe, délai d'intervention contractuel et supervision. Vous introduisez, le groupe chiffre et installe.",
        formulaires: ["Demande de cotation", "Recevoir la plaquette"],
      },
    ],
  },
};
