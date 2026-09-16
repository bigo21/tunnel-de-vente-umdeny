/** Les cinq vues du tunnel. Le parcours est linéaire, sans navigation libre. */
export type Vue = "accueil" | "menu" | "theme" | "formulaire" | "confirmation";

/**
 * Les quatre étapes affichées dans l'en-tête. « menu » et « theme » partagent
 * l'étape 2 : choisir un sujet et le regarder sont un même temps du parcours.
 */
export const ETAPES = 4;

const NUMERO_ETAPE: Record<Vue, number> = {
  accueil: 1,
  menu: 2,
  theme: 2,
  formulaire: 3,
  confirmation: 4,
};

const LIBELLE_ETAPE: Record<Vue, string> = {
  accueil: "Étape 1 · Bienvenue",
  menu: "Étape 2 · Choisir un sujet",
  theme: "Étape 2 · Le film",
  formulaire: "Étape 3 · Formulaire",
  confirmation: "Étape 4 · Confirmation",
};

export function numeroEtape(vue: Vue): number {
  return NUMERO_ETAPE[vue];
}

export function libelleEtape(vue: Vue): string {
  return LIBELLE_ETAPE[vue];
}
