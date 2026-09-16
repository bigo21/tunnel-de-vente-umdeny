/**
 * Les films du tunnel sont hébergés sur YouTube.
 *
 * Tant que les vidéos définitives ne sont pas livrées, `content/` renseigne
 * des vidéos de test (courts métrages Creative Commons de la Blender
 * Foundation) et `VIDEOS_PROVISOIRES` reste à `true` : l'interface conserve
 * alors sa mention « vidéo de test », comme l'exige le brief. Passer le
 * drapeau à `false` le jour de la livraison suffit à la faire disparaître.
 */

/**
 * Les vidéos en place sont-elles encore des vidéos de test ? Tant que c'est
 * le cas, l'interface le dit clairement plutôt que de laisser croire au
 * contenu final.
 */
export const VIDEOS_PROVISOIRES = true;

/** Une vidéo du parcours : son identifiant YouTube et sa durée annoncée. */
export type Video = {
  id: string;
  /** Durée affichée sur la vignette, ex. « 1 min 45 ». */
  duree: string;
};

/**
 * Vignette 16/9 en pleine définition. YouTube sert `maxresdefault` pour toute
 * vidéo qui a été mise en ligne dans une définition suffisante.
 */
export function afficheVideo(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export const AFFICHE_LARGEUR = 1280;
export const AFFICHE_HAUTEUR = 720;

/**
 * URL du lecteur, sur le domaine sans cookie : rien n'est déposé chez le
 * visiteur tant qu'il n'a pas lancé la lecture.
 *
 * Le lecteur n'est monté qu'à l'ouverture de la fenêtre, donc `autoplay` part
 * d'un geste explicite du visiteur — jamais d'une lecture automatique subie.
 */
export function lecteurVideo(id: string): string {
  const parametres = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${parametres}`;
}
