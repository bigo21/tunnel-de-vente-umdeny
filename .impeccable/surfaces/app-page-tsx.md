---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app"]
---

# Tunnel Umdeny Capital — surface brief

Mode : **Persuade**. Route : tout `app/` (couverture, sommaire par branche, page sujet, demande, confirmation).

Audience : investisseurs prudents et apporteurs d'affaires, sur mobile moyen de gamme. Action : une demande de rappel qualifiée. Preuve disponible : les films (provisoires), le triptyque Contexte / Problème / Solution, les règles « aucun versement », « contrat écrit », « rappel sous 48 h ouvrées ». Aucune autre preuve n'existe : ni témoignage, ni rendement.

Architecture retenue : hybride. Des routes réelles par étape (`/`, `/[parcours]`, `/[parcours]/[sujet]`, `.../demande`, `.../demande/envoyee`) pour que le bouton Retour du téléphone, les liens profonds et le rendu statique fonctionnent. Chaque route se lit en défilement continu. Les transitions entre routes passent par React `<ViewTransition>`.

## Direction contract

THESIS: Le tunnel est un livret, pas une landing. On l'ouvre, on lit une page par étape, on y inscrit sa ligne, et elle revient contresignée. Il refuse la landing fintech empilée (héros, chiffres, cartes, formulaire en bas) et la broadsheet à filets et petites capitales.

OWN-WORLD: Couverture et pages en bleu nuit, qui domine. Réglure en filets gris bleuté, un seul poids. La page claire est réservée à ce qui s'écrit : la fiche de demande et le reçu. L'or ne sert qu'aux signaux : fil de reliure, focus, action principale, tampon, un repère par écran. Aucune carte encadrée : les entrées reposent sur la réglure. Onglets d'index en bord de page pour les deux branches. Les films sont des planches collées dans le livret, avec un tampon « film provisoire ». Jost pour les titres et l'interface, Spectral pour le texte. Aucune texture de papier ni écriture manuscrite : on reprend la grammaire du livret, pas son déguisement.

STORY: Le visiteur comprend d'abord ce qui ne se passe pas ici (aucun versement, un contrat écrit, un rappel sous 48 h). Il choisit son onglet, regarde un film, lit trois entrées, puis inscrit sa ligne (nom, téléphone, une question, consentement). Il repart avec un reçu et, seulement à ce moment, WhatsApp.

FIRST VIEWPORT: Mobile : lockup en haut, titre Jost sur quatre lignes au plus, puis les deux onglets de branche comme actions pleine largeur, chacun avec son nombre de films. Sous la ligne de flottaison, les trois conditions en une réglure. Desktop : le titre occupe les 7 colonnes de gauche, la planche du film d'accueil (tamponnée) les 5 de droite. Les onglets de branche sont ancrés au bord droit, comme sur un livret. Le fil d'or court sur toute la hauteur de la marge gauche.

FORM: Livret / carnet de cotisation, sixième entrée de ma liste ordonnée (1 note d'information, 2 programme de festival, 3 rapport annuel, 4 correspondance de banque privée, 5 presse financière, 6 livret, 7 reçus Mobile Money), traduite dans la charte ; seed 59833b2e, indice assigné 6. Rehaussements repris des challengers déclinés : les états s'impriment comme des entrées plutôt qu'en chrome (terminal) ; rien n'est encadré, la hiérarchie tient à l'encre et à la réglure (cracktro) ; un fil continu qui porte la navigation (fusée pulp, néon) ; audace d'échelle entre la planche et la réglure (tropicália) ; les conditions et le risque sont visibles à côté de chaque sujet (étagère d'émaux). Signature : fil de reliure en or, lié au défilement et aux étapes ; entrées inscrites par un clip-path le long de la réglure ; phrase des conditions révélée mot à mot dans une section épinglée ; page tournée entre les étapes ; tampon sur le reçu. WebGL : distorsion au survol des planches du sommaire (pointeur fin seulement) et fondu par déplacement entre deux films.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions
- Textes Contexte / Problème / Solution encore indicatifs côté client.
- Films définitifs et liens WhatsApp à fournir.
- Destination de l'envoi non arrêtée.
- Le brief initial citait des « porteurs de projet » ; la branche reste celle des apporteurs d'affaires (confirmé le 2026-09-21).
