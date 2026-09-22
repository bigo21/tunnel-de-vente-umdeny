# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Deux publics, qui arrivent surtout depuis un lien en bio ou une publicité, sur mobile et avec une connexion souvent moyenne :

- **Investisseurs** : des particuliers qui cherchent où placer leur épargne. Prudents, souvent échaudés par des offres floues ou des arnaques. Leur question implicite : « Est-ce sérieux, et qu'est-ce que je signe ? »
- **Apporteurs d'affaires** : des personnes bien introduites auprès d'entreprises (administrations, hôtellerie, santé, banque, commerce) qui veulent porter une offre du groupe contre commission, dans un cadre écrit.

Le brief initial mentionnait des « porteurs de projet cherchant un financement ». Le contenu métier ne décrit pas ce public ; l'utilisateur a confirmé le 2026-09-21 que la seconde branche reste celle des apporteurs d'affaires.

## Product Purpose

Présenté aux clients comme le **Parcours de l'écosystème Umdeny** : un tunnel de vente qui transforme une visite en **demande de rappel qualifiée**. Le visiteur repart en ayant compris une opportunité (grâce à une vidéo courte par sujet), en ayant confiance, et avec la promesse d'un appel d'un conseiller sous 48 heures ouvrées.

Le succès se mesure au nombre de demandes complètes : nom, téléphone, consentement et réponse à la question de qualification de la branche.

## Positioning

Umdeny Capital est un groupe d'investissement. **Vireel est la marque qui gère ses réseaux sociaux et sa visibilité** (précision de l'utilisateur du 2026-09-22) : Vireel n'est pas l'exploitant des activités, et le tunnel ne doit pas le présenter ainsi. Qui exploite concrètement chaque activité (points Mobile Money, bornes WiFi, instruction des dossiers, installation de l'IP dédié) reste à préciser : d'ici là, les textes ne nomment pas d'exploitant. L'argent placé est adossé à des activités concrètes que le groupe opère ou finance (distribution Mobile Money, bornes WiFi, financement participatif de PME instruites, accompagnement boursier, liaisons Internet dédiées pour entreprises). Rien ne se signe ni ne se verse en ligne : tout passe par un entretien, puis par un contrat écrit.

## Operating Context

- Acquisition : contenus organiques et publicité sur les réseaux sociaux animés par Vireel, un lien unique (en bio ou dans le message) vers la page d'atterrissage Umdeny.
- Parcours : accueil → choix de la branche → choix d'un sujet → film et triptyque Contexte / Problème / Solution → demande → confirmation.
- Les films sont hébergés sur YouTube et lus sur le domaine sans cookie, seulement après un geste du visiteur.
- Après envoi, la page de félicitation propose deux liens WhatsApp : le contact direct avec un conseiller Umdeny et la chaîne de suivi **Vireel**.
- Après envoi, un conseiller rappelle sous 48 heures ouvrées ; les conditions écrites (montant, durée, rémunération, sortie) précèdent tout versement.
- La marque vit uniquement dans `app/globals.css` (tokens) et `content/` (textes, logos), pour pouvoir décliner la base. L'existence d'une version « Vireel » du tunnel, décidée quand Vireel passait pour la filiale opérationnelle, est à reconfirmer depuis la précision du 2026-09-22.

## Capabilities and Constraints

- Next.js 16 (App Router), Tailwind v4, Motion, GSAP, Lenis, Three.js.
- La demande n'est envoyée nulle part pour l'instant : `lib/tunnel/envoi.ts` est le point d'extension unique ; la destination (email, CRM, base) n'est pas arrêtée.
- **Aucun lien ni aucune mention de WhatsApp avant l'écran qui suit l'envoi.** Les liens WhatsApp viennent de variables d'environnement et s'affichent en état « à fournir » tant qu'elles sont vides.
- **Aucun versement demandé sur le site**, et le site le dit clairement.
- Chaque sujet a sa vidéo courte. Les vidéos en place sont des films de test ; tant que `VIDEOS_PROVISOIRES` vaut `true`, chaque emplacement le signale visiblement.
- Champs obligatoires : nom, téléphone, consentement à être contacté. La question de qualification dépend de la branche.

## Brand Commitments

- Charte officielle Umdeny Capital : bleu nuit `#030929` dominant, or `#C08F51` (dégradé `#DFB56D` → `#9E6632`), blancs et gris bleutés ; environ 70 % bleu, 20 % clairs, 10 % or. L'or est un signal.
- Jost pour les titres et l'interface, Spectral pour le texte courant.
- Logos : `public/marque/lockup-blanc.png`, `public/marque/symbole.png`.
- Voix : sobre, précise, sans superlatif ni promesse de gain.

## Evidence on Hand

- Contenu métier : `content/parcours.ts` (sept sujets, deux branches, options de qualification) et `content/marque.ts` (accroches, délais, chiffres clés : 4 activités, 48 h, 0 versement).
- Aucun témoignage, aucun rendement chiffré, aucune référence client, aucun agrément réglementaire n'est fourni. Rien de tout cela ne doit être inventé.
- Films définitifs : non livrés.

## Product Principles

1. **La confiance avant la collecte.** Les coordonnées ne sont demandées qu'après que le visiteur a vu et compris un sujet.
2. **Dire ce qui ne se passe pas ici.** Pas de versement, pas de signature en ligne, un contrat écrit : ces absences sont des arguments et doivent se lire tôt.
3. **La vidéo est le sujet.** Le texte précise, il ne remplace pas le film.
4. **Honnêteté des états provisoires.** Ce qui manque (films, liens WhatsApp) se voit comme manquant.
5. **Mobile moyen de gamme d'abord.** Chaque effet a un coût à justifier et un repli.

## Accessibility & Inclusion

WCAG 2.2 AA. Parcours complet au clavier et au lecteur d'écran, focus visible, `prefers-reduced-motion` respecté partout, repli propre sans WebGL. Cibles tactiles d'au moins 44 px, champs à 16 px minimum.
