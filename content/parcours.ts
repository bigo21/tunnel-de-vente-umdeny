import { FORMULAIRES } from "./formulaires";
import type { CleParcours, Parcours } from "@/lib/tunnel/types";

/**
 * Les deux branches du tunnel et leurs sujets, repris de la maquette
 * « Parcours Umdeny Capital ».
 *
 * Les textes sont une ÉBAUCHE : le client fournira la rédaction définitive.
 *
 * Règle éditoriale (client, 2026-09-22) : la vidéo est la source principale
 * d'explication. Le texte oriente le prospect dans le tunnel et appuie un
 * point : une à deux phrases courtes par champ, des mots simples, aucun
 * chiffre ni promesse qui ne vienne du client.
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
        etiquette: "Général",
        video: { id: "TLkA0RELQ1g", duree: "1 min 30" },
        titre: "L'écosystème Umdeny Capital",
        accroche:
          "Quatre activités, un même groupe : la vue d'ensemble avant de choisir.",
        contexte:
          "Beaucoup d'épargne dort, faute de placements clairs et vérifiables.",
        probleme:
          "Conditions floues, ticket d'entrée trop élevé, et personne pour expliquer ce que l'on signe.",
        solution:
          "Umdeny Capital opère ou finance quatre activités concrètes. Des conditions écrites, et un entretien avant tout engagement.",
        formulaires: [FORMULAIRES.profil],
      },
      {
        cle: "mobile-money",
        etiquette: "GAB",
        video: { id: "Y-rmzh0PI3c", duree: "2 min" },
        titre: "Distributeur Mobile Money",
        accroche:
          "Financer un point de dépôt et de retrait, et être rémunéré sur les commissions.",
        contexte:
          "Le paiement mobile est le premier moyen de transfert de la région. Chaque quartier a besoin de points de service.",
        probleme:
          "Un point demande un fonds de roulement permanent et une présence chaque jour.",
        solution:
          "Vous financez le fonds de roulement, l'exploitation est prise en charge. Votre rémunération suit les commissions, avec un relevé chaque mois.",
        formulaires: [FORMULAIRES.profil, FORMULAIRES.documentMobileMoney],
      },
      {
        cle: "wifi",
        etiquette: "WiFi Zone",
        video: { id: "WhWc3b3KhnY", duree: "1 min 45" },
        titre: "Borne WiFi Zone",
        accroche:
          "Financer des bornes Wi-Fi dans des lieux de passage, et percevoir une part des connexions.",
        contexte:
          "Marchés, gares, campus : on a besoin de connexion toute la journée, et les forfaits mobiles coûtent cher.",
        probleme:
          "Une borne demande du matériel, un abonnement et de l'entretien : difficile à tenir seul.",
        solution:
          "Les bornes sont installées et entretenues pour vous. Vous percevez une part des connexions vendues, avec un relevé par borne.",
        formulaires: [
          FORMULAIRES.profil,
          FORMULAIRES.cotationWifi,
          FORMULAIRES.documentWifi,
        ],
      },
      {
        cle: "financement-participatif",
        etiquette: "Crowdlending",
        video: { id: "SkVqJ1SGeL0", duree: "2 min 10" },
        titre: "Financement participatif",
        accroche:
          "Prêter à des entreprises sélectionnées, avec échéancier et garanties écrites.",
        contexte:
          "Des PME rentables ont des commandes à financer, mais pas encore accès au crédit bancaire.",
        probleme:
          "Prêter directement, sans analyse ni contrat, c'est prendre un risque que l'on ne mesure pas.",
        solution:
          "Chaque dossier est étudié, avec échéancier et garanties. Vous lisez le dossier complet avant de décider.",
        formulaires: [FORMULAIRES.profil],
      },
      {
        cle: "bourse",
        etiquette: "Bourse",
        video: { id: "R6MlUcmOul8", duree: "2 min" },
        titre: "Bourse — actions, obligations, ETF",
        accroche:
          "Être accompagné pour investir en bourse, avec méthode.",
        contexte:
          "La bourse est accessible depuis un téléphone, mais le vocabulaire et les choix découragent.",
        probleme:
          "Sans méthode, on achète trop cher et on vend dans la panique.",
        solution:
          "On vous aide à ouvrir votre compte et à fixer un plan ; les décisions restent les vôtres. Risque de perte en capital.",
        formulaires: [FORMULAIRES.profil],
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
        etiquette: "Général",
        video: { id: "mN0zPOpADL4", duree: "1 min 40" },
        titre: "Le rôle d'apporteur d'affaires",
        accroche:
          "Votre rôle, votre commission, et le moment où elle est versée.",
        contexte:
          "Les entreprises choisissent souvent leurs fournisseurs sur recommandation.",
        probleme:
          "Sans cadre écrit, une commission promise à l'oral finit souvent en désaccord.",
        solution:
          "Une convention signée, chaque introduction enregistrée, et une commission versée dès que la facture est payée.",
        formulaires: [FORMULAIRES.apporteur],
      },
      {
        cle: "ip-dedie",
        etiquette: "IP publique",
        video: { id: "_cMxraX_5RE", duree: "1 min 30" },
        titre: "Internet IP Dédié",
        accroche:
          "L'offre Internet professionnelle que vous présentez aux entreprises.",
        contexte:
          "Banques, cliniques, hôtels : sans connexion, leur activité s'arrête.",
        probleme:
          "Elles paient un débit qu'elles n'ont pas toujours, sans garantie de réparation rapide.",
        solution:
          "Une liaison dédiée, un débit garanti, une IP fixe et un délai d'intervention prévu au contrat. Vous présentez, le groupe chiffre et installe.",
        formulaires: [FORMULAIRES.apporteur],
      },
    ],
  },
};
