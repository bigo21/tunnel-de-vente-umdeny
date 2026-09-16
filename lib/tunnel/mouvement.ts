import type { Transition, Variants } from "motion/react";

/**
 * Le vocabulaire de mouvement du tunnel, au même titre que les couleurs et les
 * polices : un seul endroit règle la cadence, les composants s'y réfèrent.
 *
 * Registre ample, demandé pour cette version : la sortie libère vite la place,
 * l'entrée prend son temps.
 */

/** Sens de déplacement dans le tunnel, qui décide de la direction du glissement. */
export type Sens = "avant" | "arriere";

/**
 * Amplitude du glissement, exprimée en pourcentage de la largeur de l'écran.
 * Une valeur en pixels traverserait la moitié d'un téléphone et à peine un
 * coin d'écran de bureau ; le pourcentage garde le même geste partout.
 */
export const AMPLITUDE = "16%";

/** Ressort de référence, utilisé pour tout ce qui se déplace. */
export const RESSORT: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/** Ressort plus vif, pour les réactions au survol et au clic. */
export const RESSORT_VIF: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 26,
};

/**
 * Entrée et sortie d'un écran. `custom` porte le sens : avancer pousse le
 * contenu vers la gauche, reculer le ramène par la droite.
 */
export const ECRAN: Variants = {
  entrant: (sens: Sens) => ({
    opacity: 0,
    x: sens === "avant" ? AMPLITUDE : `-${AMPLITUDE}`,
    filter: "blur(5px)",
  }),
  present: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { ...RESSORT, opacity: { duration: 0.32, ease: "easeOut" } },
  },
  sortant: (sens: Sens) => ({
    opacity: 0,
    x: sens === "avant" ? `-${AMPLITUDE}` : AMPLITUDE,
    filter: "blur(5px)",
    transition: { duration: 0.24, ease: "easeIn" },
  }),
};

/** Conteneur qui fait arriver ses enfants les uns après les autres. */
export const CASCADE: Variants = {
  present: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

/** Un élément d'une cascade. */
export const CASCADE_ENFANT: Variants = {
  entrant: { opacity: 0, y: 24 },
  present: {
    opacity: 1,
    y: 0,
    transition: RESSORT,
  },
};

/** Ouverture de la fenêtre du lecteur. */
export const LECTEUR: Variants = {
  entrant: { opacity: 0 },
  present: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  sortant: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

export const CADRE_LECTEUR: Variants = {
  entrant: { opacity: 0, scale: 0.94, y: 16 },
  present: { opacity: 1, scale: 1, y: 0, transition: RESSORT },
  sortant: { opacity: 0, scale: 0.97, transition: { duration: 0.18 } },
};
