---
name: Tunnel Umdeny Capital
description: Le livret — un tunnel de demande de rappel qui se lit comme un carnet relié, en bleu nuit, réglé, et contresigné à la fin.
colors:
  nuit: "#030929"
  nuit-releve: "#081038"
  reglure: "#1c275a"
  reglure-forte: "#5a6597"
  encre: "#f3f5fb"
  encre-douce: "#b4bcda"
  encre-sourde: "#8891ba"
  papier: "#eef1f7"
  papier-releve: "#e3e8f2"
  papier-encre: "#030929"
  papier-encre-douce: "#3d4775"
  papier-encre-sourde: "#5e6890"
  papier-reglure: "#c9d0e2"
  papier-filet: "#6b7599"
  or: "#c08f51"
  or-clair: "#dfb56d"
  or-fonce: "#9e6632"
  or-encre: "#8a5a2b"
  sur-or: "#030929"
  alerte-papier: "#a3301c"
typography:
  affiche:
    fontFamily: "Jost, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.55rem + 4.6vw, 5.4rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  titre:
    fontFamily: "Jost, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.45rem + 2.4vw, 3.4rem)"
    fontWeight: 300
    lineHeight: 1.06
    letterSpacing: "-0.022em"
  intertitre:
    fontFamily: "Jost, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.18rem + 0.7vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  chapeau:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  lecture:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  mention:
    fontFamily: "Jost, Century Gothic, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  tampon:
    fontFamily: "Jost, Century Gothic, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  aucun: "0px"
  focus: "2px"
  plein: "999px"
spacing:
  gouttiere: "clamp(1.25rem, 0.6rem + 3vw, 3.5rem)"
  reliure: "clamp(1.25rem, 0.4rem + 3.6vw, 5.5rem)"
  hauteur-entete: "4rem"
  colonnes: "clamp(2rem, 5vw, 6rem)"
components:
  bouton-or:
    backgroundColor: "{colors.or}"
    textColor: "{colors.sur-or}"
    typography: "{typography.mention}"
    rounded: "{rounded.aucun}"
    padding: "0 24px"
    height: "56px"
  lien-or:
    textColor: "{colors.or-clair}"
    typography: "{typography.mention}"
    height: "44px"
  saisie:
    backgroundColor: "{colors.papier-releve}"
    textColor: "{colors.papier-encre}"
    rounded: "{rounded.aucun}"
    padding: "0 12px"
    height: "48px"
  pastille:
    backgroundColor: "{colors.papier}"
    rounded: "{rounded.plein}"
    size: "22px"
  case:
    backgroundColor: "{colors.papier}"
    rounded: "{rounded.aucun}"
    size: "22px"
  case-cochee:
    backgroundColor: "{colors.papier-encre}"
    textColor: "{colors.or-clair}"
  tampon:
    backgroundColor: "{colors.nuit}"
    textColor: "{colors.or-clair}"
    typography: "{typography.tampon}"
    padding: "5.6px 9.6px"
  tampon-papier:
    textColor: "{colors.or-encre}"
    typography: "{typography.tampon}"
  onglet:
    textColor: "{colors.encre}"
    typography: "{typography.intertitre}"
    padding: "20px 4px 20px 0"
  onglet-compteur:
    backgroundColor: "{colors.nuit-releve}"
    textColor: "{colors.encre-douce}"
    width: "80px"
  page-claire:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.papier-encre}"
    rounded: "{rounded.aucun}"
    padding: "48px"
  lecture-film:
    backgroundColor: "{colors.or}"
    textColor: "{colors.sur-or}"
    rounded: "{rounded.plein}"
    size: "56px"
---

# Design System: Tunnel Umdeny Capital

## Overview

**Creative North Star: "Le livret"**

Le tunnel est un livret relié, pas une landing. On l'ouvre sur une couverture bleu nuit, on lit une page par étape, on y inscrit sa ligne sur une page claire, et elle revient contresignée d'un tampon. Toute la hiérarchie tient à l'encre et à la réglure : des filets d'un pixel séparent les entrées, rien n'est encadré, et l'or ne sert qu'à signaler. La densité est celle d'un document qu'on lit, pas d'une vitrine qu'on parcourt : grandes marges, titres Jost en graisse légère, texte courant en Spectral.

Le livret reprend la grammaire du carnet (reliure, réglure, onglets d'index, planches collées, tampons, pages qui se tournent) sans son déguisement : aucune texture de papier, aucune écriture manuscrite, aucun effet de matière. La page claire n'est pas un fond alterné : elle est réservée à ce qui s'écrit, la fiche de demande et le reçu. Le mouvement suit le même geste (on inscrit, on tourne, on tamponne) et se replie entièrement quand le visiteur demande moins de mouvement.

Le système refuse la landing fintech empilée (héros, chiffres clés, cartes, formulaire en bas de page) et la broadsheet à filets et petites capitales.

La marque vit à deux endroits seulement : les tokens de `app/globals.css` (bloc `@theme` et `:root`) et les fichiers de `content/` (`marque.ts`, `parcours.ts`, `whatsapp.ts`), plus les logos de `public/marque/` et le chargement des deux polices dans `app/layout.tsx`. Une version Vireel réécrit ces fichiers ; les composants de `components/livret/` ne connaissent aucune couleur, police ni durée en dur.

**Key Characteristics:**
- Bleu nuit dominant (~70 %), clairs (~20 %), or (~10 %), conformément à la charte.
- Entrées posées sur la réglure, jamais dans des cartes.
- Page claire réservée à la fiche de demande et au reçu.
- Fil de reliure or : la progression du tunnel, fixe pendant les changements de page.
- Tampons typographiques : « film provisoire » sur les planches, « enregistrée » sur le reçu.
- Pages tournées entre les étapes (View Transitions), entrées inscrites le long de la réglure.
- Chaque effet a son repli : mouvement réduit, sans WebGL, sans script.

## Colors

Une nuit bleue profonde tenue en deux hauteurs, des encres bleutées mesurées pour le contraste, une page claire froide et un or chaud qui ne sert qu'à signaler.

### Primary
- **Or de charte** (`or`) : le signal. Dégradé de l'action principale (de `or-clair` vers `or-fonce`, `--degrade-or`, 140°), anneau de focus, fil de reliure, disque de lecture des films, sélection de texte.
- **Or clair** (`or-clair`) : l'or lisible sur la nuit. Liens d'action, tampons sur la nuit, survol des titres d'entrée, première condition (« Aucun »), mots de clôture de la phrase d'engagement.
- **Or foncé** (`or-fonce`) : l'extrémité sombre du dégradé du bouton, jamais seul.
- **Or d'encre** (`or-encre`) : l'or lisible sur papier (5,2:1). Focus, curseur, pastille cochée et tampon du reçu sur la page claire.
- **Sur or** (`sur-or`) : le texte posé sur l'or, identique à la nuit.

### Neutral
- **Nuit** (`nuit`) : le fond du livret, partout sauf sur la page claire. Couleur de barre du navigateur.
- **Nuit relevée** (`nuit-releve`) : fond des planches avant chargement, compteur des onglets sur bureau.
- **Réglure** (`reglure`) : les filets décoratifs entre les entrées, les segments à venir du fil.
- **Réglure forte** (`reglure-forte`) : les filets de contrôle (≥ 3:1 sur la nuit), la séparation avant l'engagement d'un sujet, les points médians, la barre de défilement.
- **Encre** (`encre`, 17,9:1) : titres et texte principal sur la nuit.
- **Encre douce** (`encre-douce`, 10,4:1) : chapeaux, accroches, libellés.
- **Encre sourde** (`encre-sourde`, 6,3:1) : numéros, durées, mentions provisoires, termes des entrées.
- **Papier** (`papier`) : la page claire. **Papier relevé** (`papier-releve`) : fond des champs et survol des options.
- **Encres sur papier** (`papier-encre` 17,3:1, `papier-encre-douce` 7,9:1, `papier-encre-sourde` 4,8:1) : les trois voix du texte sur la page claire.
- **Réglure sur papier** (`papier-reglure`) : filets entre les lignes de la fiche et du reçu. **Filet sur papier** (`papier-filet`) : bord des champs, pastilles et cases (filet de contrôle).
- **Alerte sur papier** (`alerte-papier`, 6,2:1) : erreurs uniquement ; les erreurs n'apparaissent que sur la page claire.

### Named Rules
**The Signal Rule.** L'or signale, il ne décore pas : action principale, focus, fil de reliure, tampon, liens d'action. Une seule surface pleine en or par écran, le bouton or ; tout le reste de l'or est de l'encre ou un filet.

**The Written Page Rule.** La page claire (`papier`) est réservée à ce qui s'écrit : la fiche de demande et le reçu. Aucune section de lecture ne passe en clair.

**The Two Inks Rule.** Sur papier, l'or devient `or-encre` et le focus suit (classe `page-claire`). `or-clair` n'est jamais posé sur le papier.

## Typography

**Display Font:** Jost (avec Century Gothic, system-ui, sans-serif), chargée en variable via `next/font` (`--police-titre`)
**Body Font:** Spectral (avec Georgia, serif), graisses 400 et 500 seulement (`--police-texte`)

**Character:** Jost, géométrique et léger, porte les titres, l'interface, les chiffres et les libellés ; Spectral, un sérif de lecture à l'écran, porte le texte courant, les chapeaux et les options de la fiche. Le contraste est entre une voix d'interface nette et une voix de document posée.

### Hierarchy
- **Affiche** (Jost 300, `clamp(2.6rem → 5.4rem)`, 1,02, -0,028em) : le seul titre de la couverture, 13ch au plus.
- **Titre** (Jost 300, `clamp(2rem → 3.4rem)`, 1,06, -0,022em) : le h1 de chaque page, et la phrase d'engagement épinglée.
- **Intertitre** (Jost 300 ou 400, `clamp(1.35rem → 1.75rem)`, 1,2) : titres d'entrée (sujets, onglets), titres de section, sujet rappelé en or sur la fiche.
- **Chapeau** (Spectral 400, `clamp(1.125rem → 1.3rem)`, 1,55) : le paragraphe sous chaque h1, 44 à 48ch.
- **Lecture** (Spectral 400, 1,0625rem, 1,65) : texte courant ; les entrées Contexte / Problème / Solution montent à 1,125rem, interligne 1,7, 60ch au plus.
- **Mention** (Jost 400 ou 500, 0,875rem, 1,5) : libellés, durées, étape en cours, liens d'action, légendes. Chiffres en `tabular-nums`.
- **Tampon** (Jost 500, 0,6875rem, 0,16em, capitales) : uniquement dans un tampon.

Les champs de la fiche sont en Jost 1,0625rem (≥ 16 px, pas de zoom mobile) ; les options de réponse en Spectral 0,9375rem.

### Named Rules
**The Light Display Rule.** Les titres Jost sont en graisse 300 ; la graisse 500 est réservée aux boutons, aux valeurs de réglure et aux légendes de champ.

**The Stamp-Only Capitals Rule.** Les capitales espacées n'existent que dans le tampon et le mot « films » du compteur d'onglet. Aucun titre ni surtitre en petites capitales.

## Layout

Le livret est une page à marge de reliure. Sur bureau (≥ 64rem, point de rupture `livret`), la marge gauche (`--reliure`) porte le fil d'or et le contenu s'aligne après elle ; ailleurs la gouttière (`--gouttiere`) suffit des deux côtés. L'en-tête fixe mesure 4rem ; `scroll-padding` réserve sa hauteur et celle de la barre d'action pour que le focus ne passe jamais dessous.

La grille de bureau est à 12 colonnes, gouttière `clamp(2rem, 5vw, 6rem)`. Compositions récurrentes : texte 6–7 colonnes contre planche ou fiche 5–7 colonnes ; la planche d'un sujet et la vitrine du sommaire restent épinglées (`sticky`, sous l'en-tête + 2rem) pendant que les entrées défilent. Sur téléphone, tout se lit en une colonne ; la planche d'un sujet et la page claire passent à fond perdu (marge négative de la gouttière).

Le rythme vertical est large et régulier : pages en `pt-8 pb-24` sur téléphone, `pt-14 pb-32` sur bureau ; entrées de réglure en 14 à 28 px de padding vertical selon leur rang. Couverture pleine hauteur sur bureau (`100svh` moins l'en-tête), section d'engagement épinglée sur 230–260 % de hauteur.

**The Margin Thread Rule.** Le fil de reliure est le seul repère de progression : 4 segments de 2 px, dans la marge gauche sur bureau, sous l'en-tête sur téléphone. Pas de barre d'étapes, pas de compteur de pourcentage.

## Elevation & Depth

Le livret est plat. La profondeur vient de la réglure et des deux hauteurs de nuit, pas des ombres. Les seules ombres sont longues, sombres et diffuses, et signalent un objet posé sur la page : la feuille claire, la planche d'un sujet, le bouton or.

### Shadow Vocabulary
- **Feuille posée** (`box-shadow: 0 40px 90px -50px rgb(0 0 0 / 0.95)`) : la page claire (fiche, reçu).
- **Planche collée** (`box-shadow: 0 30px 80px -40px rgb(0 0 0 / 0.9)`) : la planche épinglée d'un sujet, sur bureau.
- **Lueur d'or** (`box-shadow: 0 10px 30px -12px rgb(192 143 81 / 0.55)`, survol `0 16px 38px -14px rgb(223 181 109 / 0.7)`) : le bouton or seulement.
- **Disque de lecture** (`box-shadow: 0 8px 24px -8px rgb(3 9 41 / 0.8)`) : le bouton de lecture posé sur une planche.

Les voiles translucides (`nuit` à 92–94 % avec flou) ne servent qu'à l'en-tête sur téléphone et à la barre d'action.

**The Flat Ledger Rule.** Une entrée de liste, une condition, un onglet ne reçoivent jamais d'ombre ni de fond : un filet au-dessus, un filet sous la dernière.

## Shapes

Angles droits partout (0) : boutons, champs, cases, page claire, planches, onglets. Le cercle (999px) est réservé à trois cas : la pastille de réponse unique, le disque de lecture d'un film et les boutons-icônes de 44 px (retour, fermer le lecteur). Le focus est un contour or de 2 px, décalé de 3 px, arrondi à 2 px. Les planches sont en 16/9, `overflow: hidden`. Les champs n'ont qu'un filet inférieur, qui passe à 2 px en or d'encre au focus. Le tampon est la seule forme inclinée (-4°), en double filet.

## Components

### Buttons
Un seul bouton plein par écran, en or : l'action qui fait avancer le tunnel.
- **Shape:** angles droits (0), hauteur 56 px (48 px dans la barre mobile), padding horizontal 24 px ; libellé à gauche, flèche à droite (`justify-between`) quand il occupe la largeur.
- **Primary (bouton or):** dégradé `--degrade-or`, texte `sur-or`, Jost 500 1rem, lueur d'or.
- **Hover / Focus:** la lueur s'étend (420 ms, `ease-livre`) ; appui : descente d'1 px ; focus : contour or. Désactivé pendant l'envoi : opacité 70 %, curseur d'attente.
- **Lien d'action (secondaire):** texte `or-clair` Jost, soulignement `or` à 40 % décalé de 4 px qui s'affirme au survol, hauteur tactile 44 px.
- **Bouton-icône:** cercle de 44 px, encre douce, passe à l'encre au survol.

### Onglets d'index
Une ligne par branche du tunnel, sur la réglure. Titre en intertitre, accroche en Spectral, action en lien or ; en bout de ligne, le compteur de films fait office d'onglet : filet vertical à gauche, chiffre Jost 300 à 1,625rem, mot « films » en capitales espacées, fond `nuit-releve` sur bureau (80 px de large, 56 px sur téléphone). Au survol, le titre et le compteur passent en `or-clair`, le filet en `or`.

### Entrées en réglure (conditions, sommaire, suites)
- **Style:** filet `reglure` au-dessus de chaque entrée, filet sous la dernière ; aucune carte, aucun fond.
- **Conditions:** libellé en mention à gauche, valeur Jost 500 à droite ; seule la première valeur (« Aucun ») passe en or. Variante sur papier avec `papier-reglure` et `or-encre`.
- **Sommaire:** numéro tabulaire, titre en intertitre, accroche, durée · « Regarder » en or avec flèche qui glisse de 4 px au survol.
- **Inscription:** au défilement, chaque entrée `data-inscrire` se découvre de gauche à droite (`clip-path`, 1,1 s, `power3.out`), comme écrite sur la ligne.

### Inputs / Fields
- **Style:** fond `papier-releve`, filet inférieur `papier-filet`, angles droits, hauteur 48 px, Jost 1,0625rem ; légende Jost 500 0,9375rem au-dessus, aide en mention `papier-encre-sourde` en dessous.
- **Focus:** filet inférieur à 2 px en `or-encre`, pas d'anneau.
- **Error:** filet `alerte-papier`, message en mention avec pictogramme d'alerte ; récapitulatif d'erreurs en tête de fiche sous un filet de 2 px `alerte-papier`.
- **Pastille / case:** 22 px, filet 1,5 px `papier-filet`. Pastille cochée : point `or-encre`. Case cochée : fond `papier-encre`, coche `or-clair`. Les options de réponse sont des lignes de réglure de 48 px qui passent en `papier-releve` au survol.

### Navigation
- **En-tête:** fixe, 4rem, lockup blanc à gauche (précédé du retour dès la deuxième page), étape « n/4 » et son nom en mention à droite. Transparent sur bureau, voile de nuit flouté sur téléphone. Ne bouge jamais pendant un changement de page.
- **Précédent / suivant d'un sujet:** deux cellules entre deux filets, libellé en mention sourde avec flèche, titre en Jost 1,125rem qui passe en or au survol.
- **Barre d'action (téléphone):** apparaît une fois la planche dépassée, disparaît dès que l'action de la page est visible ; voile de nuit, filet supérieur, bouton or pleine largeur.

### Fil de reliure (signature)
Quatre segments de 2 px séparés de 3 px, un par étape. Étapes franchies en `or` plein, étape en cours en `or` à 45 % qui se remplit d'or plein au fil du défilement, étapes à venir en `reglure`. Vertical dans la marge de reliure sur bureau, horizontal sous l'en-tête sur téléphone. Fixe pendant les transitions de page (`view-transition-name: fil`). Le reçu remplit le dernier segment d'emblée.

### Planche (film)
Une vignette 16/9 collée dans le livret, sans cadre. Voile de nuit en bas (60 % de hauteur) pour garantir la lecture de la durée ; disque de lecture or à gauche en bas. Le lecteur YouTube (domaine sans cookie) ne se monte qu'au clic, dans le même cadre, sans fenêtre modale. Parallaxe discrète (±5 %) sur la couverture. La planche garde sa place d'une page à l'autre (transition partagée `planche`).
- **Sourdine:** tant que les films sont provisoires, la vignette est désaturée et assombrie (`grayscale 0.78, sepia 0.14, brightness 0.8, contrast 1.06`) et rend sa couleur au survol ou au focus (700 ms). Légende « vidéo de test » en mention sourde sous la planche.

### Tampon
Encre d'or à l'état de tampon : Jost 500, 0,6875rem, capitales espacées de 0,16em, double filet (bordure + contour décalé de 2 px) en `currentColor`, inclinaison -4°. Sur la nuit : `or-clair` sur un voile de nuit à 72 %, en haut à droite d'une planche (« film provisoire »). Sur le reçu : `or-encre` sans fond, il se pose (520 ms après 380 ms : de -14° et ×1,7 à -4° et ×1).

### Vitrine du sommaire (bureau)
Sur bureau, les vignettes quittent les lignes pour une vitrine unique épinglée à droite, qui montre le film de la ligne survolée ou atteinte au clavier. Avec WebGL2, pointeur fin et mouvement accepté seulement : fondu par déplacement entre deux films et onde légère sous le pointeur, rendu arrêté au repos, sourdine reproduite dans le shader. Sinon, fondu enchaîné d'opacité (500 ms). Téléphone et tablette : chaque ligne porte sa vignette.

### Mouvement
- **Courbes:** `ease-livre` (0.22, 1, 0.36, 1) pour toute entrée ; `ease-tourne` (0.65, 0, 0.35, 1) pour la page qui sort.
- **Cadence:** sortie 180 ms, entrée 420 ms, page 620 ms. La sortie libère vite la place, l'entrée prend son temps.
- **Page tournée:** en avant, la page sortante se replie vers le haut et la suivante monte depuis la réglure ; en arrière, le geste s'inverse. En-tête et fil ne bougent pas.
- **Phrase d'engagement:** section épinglée, révélée mot à mot (opacité 0,16 → 1) au défilement ; les derniers mots prennent l'or.
- **Défilement lissé (Lenis):** pointeur fin et mouvement accepté seulement ; jamais chargé sur téléphone.
- **Replis:** `prefers-reduced-motion` annule transitions de page, inscription, épinglage, parallaxe, tampon et WebGL en posant l'état final ; sans script, tout est visible (les révélations ne s'arment qu'avec la classe `js-mouvement`).

## Do's and Don'ts

### Do:
- **Do** poser chaque liste sur la réglure : filet `reglure` d'1 px au-dessus de chaque entrée, filet sous la dernière.
- **Do** réserver la page `papier` à la fiche de demande et au reçu, avec `or-encre` et `papier-filet` pour tout signal ou contrôle qui s'y trouve.
- **Do** limiter l'or plein à un seul bouton par écran, et utiliser `or-clair` pour les liens d'action et les signaux sur la nuit.
- **Do** passer toute vignette de test en sourdine et la tamponner « film provisoire » tant que `VIDEOS_PROVISOIRES` vaut `true`.
- **Do** passer entre étapes par la page tournée (`page-avant` / `page-arriere`) et garder l'en-tête et le fil fixes.
- **Do** fournir un repli à chaque effet : état final sous mouvement réduit, fondu simple sans WebGL, contenu visible sans script.
- **Do** tenir les cibles tactiles à 44 px au moins et les champs à 16 px au moins.
- **Do** prendre toute couleur, police, durée ou marge dans les tokens de `app/globals.css`, et tout texte de marque dans `content/`.

### Don't:
- **Don't** encadrer une entrée dans une carte à fond, bordure ou coins arrondis.
- **Don't** alterner des sections claires et sombres pour rythmer la lecture : le clair est la page qui s'écrit.
- **Don't** ajouter de texture de papier, de grain ni d'écriture manuscrite : la grammaire du livret, pas son déguisement.
- **Don't** construire la landing fintech empilée (héros, bandeau de chiffres clés, grille de cartes, formulaire en bas).
- **Don't** poser des surtitres en petites capitales au-dessus des titres ; les capitales espacées appartiennent au tampon.
- **Don't** arrondir les boutons, champs, planches ou pages ; le cercle est réservé à la pastille, au disque de lecture et aux boutons-icônes.
- **Don't** écrire une couleur en dur dans un composant.
