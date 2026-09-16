import type { CleParcours, Parcours } from "@/lib/tunnel/types";

/**
 * Les deux branches du tunnel et leurs sujets, repris de la maquette
 * « Parcours Vireel v2 ».
 *
 * Les textes Contexte / Problème / Solution sont encore indicatifs : la
 * rédaction définitive est en cours côté client. Leur longueur est en
 * revanche représentative et sert de garde-fou à la mise en page.
 */
export const PARCOURS: Record<CleParcours, Parcours> = {
  investisseur: {
    cle: "investisseur",
    libelle: "Parcours investisseur",
    titreMenu: "Cinq opportunités, cinq vidéos.",
    teinte: "accent",
    carteAccueil: {
      titre: "Je suis investisseur",
      accroche: "Cinq vidéos, cinq opportunités.",
      action: "Voir les opportunités →",
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
        duree: "1 min 30",
        titre: "L'écosystème Vireel",
        accroche: "Comment quatre activités se financent entre elles.",
        contexte:
          "L'épargne est là, les véhicules lisibles beaucoup moins : entre le livret qui ne rapporte rien et les promesses invérifiables, il manque une offre adossée à des activités réelles.",
        probleme:
          "Opacité des conditions, ticket d'entrée hors de portée, aucun interlocuteur pour expliquer ce que l'on signe.",
        solution:
          "Quatre activités opérées par le groupe, des conditions écrites, et un entretien de qualification avant tout engagement.",
        formulaires: ["Vérifier mon profil investisseur"],
      },
      {
        cle: "mobile-money",
        numero: "02",
        duree: "2 min",
        titre: "Distributeur Mobile Money",
        accroche: "Financer un point de distribution, être payé sur les commissions.",
        contexte:
          "Le paiement mobile est le premier moyen de transfert de la région : chaque quartier a besoin de points de dépôt et de retrait approvisionnés en liquidité.",
        probleme:
          "Ouvrir un point demande un fonds de roulement permanent et une présence quotidienne. Beaucoup ont l'emplacement sans le capital, ou l'inverse.",
        solution:
          "Vous financez le fonds de roulement d'un point exploité par Vireel. Exploitation et trésorerie prises en charge, relevé de commissions chaque mois.",
        formulaires: [
          "Vérifier mon profil investisseur",
          "Recevoir le document détaillé",
        ],
      },
      {
        cle: "wifi",
        numero: "03",
        duree: "1 min 45",
        titre: "Borne WiFi Zone",
        accroche: "Équiper un lieu de passage et percevoir une part des connexions.",
        contexte:
          "Marchés, gares routières, campus : la demande de connexion est continue quand les forfaits mobiles restent chers à l'usage prolongé.",
        probleme:
          "Une borne suppose du matériel, un abonnement de gros et une maintenance régulière — hors de portée d'un particulier isolé.",
        solution:
          "Vireel déploie et maintient les bornes. Vous financez une ou plusieurs zones et percevez une part des connexions vendues, borne par borne.",
        formulaires: ["Vérifier mon profil investisseur", "Demande de cotation"],
      },
      {
        cle: "financement-participatif",
        numero: "04",
        duree: "2 min 10",
        titre: "Financement participatif",
        accroche: "Prêter à des entreprises instruites, avec échéancier écrit.",
        contexte:
          "Des PME rentables mais jeunes n'obtiennent pas de crédit bancaire, alors qu'elles ont des commandes signées à financer.",
        probleme:
          "Le prêt direct se fait souvent sans analyse ni document : l'argent circule, le risque n'est pas mesuré, le remboursement n'est pas encadré.",
        solution:
          "Vireel instruit le dossier, fixe l'échéancier et les garanties, puis ouvre le financement à plusieurs prêteurs. Vous lisez le dossier avant de vous positionner.",
        formulaires: ["Recevoir un dossier de financement"],
      },
      {
        cle: "bourse",
        numero: "05",
        duree: "2 min",
        titre: "Bourse — actions, obligations, ETF",
        accroche: "Être accompagné pour ouvrir un compte et tenir une méthode.",
        contexte:
          "Les marchés cotés sont accessibles depuis un téléphone, mais le vocabulaire et le choix des supports découragent les primo-investisseurs.",
        probleme:
          "Sans méthode on achète au plus haut et on vend dans la panique. Le risque n'est pas le marché, c'est l'improvisation.",
        solution:
          "Accompagnement à l'ouverture, horizon et répartition définis avec vous, points d'étape réguliers. Les décisions restent les vôtres. Risque de perte en capital.",
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
    titreMenu: "Deux vidéos pour cadrer votre rôle.",
    teinte: "encre",
    carteAccueil: {
      titre: "Je suis apporteur d'affaires",
      accroche: "Deux vidéos, votre rôle et l'offre à porter.",
      action: "Voir le parcours →",
    },
    questionQualification: "Secteur des entreprises que vous pouvez introduire",
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
        duree: "1 min 40",
        titre: "Le rôle d'apporteur d'affaires",
        accroche: "Ce qui est attendu, ce qui est versé, et quand.",
        contexte:
          "Les décisions d'équipement des entreprises se prennent par recommandation : un contact bien placé fait gagner des mois à un fournisseur sérieux.",
        probleme:
          "Beaucoup d'apporteurs travaillent sans cadre : commission promise à l'oral, périmètre flou, aucune trace de qui a amené quoi.",
        solution:
          "Une convention signée, une fiche de contact horodatée à chaque introduction, une commission versée sur facture encaissée, et le suivi de vos dossiers.",
        formulaires: ["Devenir apporteur d'affaires"],
      },
      {
        cle: "ip-dedie",
        numero: "02",
        duree: "1 min 30",
        titre: "Internet IP Dédié",
        accroche: "L'offre que vous portez auprès des entreprises.",
        contexte:
          "Banques, cliniques, hôtels : leur activité s'arrête quand la connexion tombe, et le partagé grand public ne tient pas cette exigence.",
        probleme:
          "Elles paient un débit annoncé qu'elles n'ont qu'aux heures creuses, sans engagement de rétablissement ni interlocuteur technique.",
        solution:
          "Liaison dédiée à débit symétrique garanti, IP fixe, délai d'intervention contractuel et supervision. Vous introduisez, Vireel chiffre et installe.",
        formulaires: ["Demande de cotation", "Recevoir la plaquette"],
      },
    ],
  },
};
