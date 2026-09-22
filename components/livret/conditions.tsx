import { MARQUE } from "@/content/marque";

/**
 * Les règles du groupe en réglure : libellé à gauche, valeur à droite, un
 * filet entre chaque ligne. Aucune carte : la ligne suffit.
 *
 * `claire` place la réglure sur la page claire (fiche de demande).
 */
export function Conditions({
  claire = false,
  className = "",
}: {
  claire?: boolean;
  className?: string;
}) {
  return (
    <dl className={`font-titre ${className}`}>
      {MARQUE.conditions.map(({ libelle, valeur }, i) => (
        <div
          key={libelle}
          data-inscrire
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-3.5 ${
            claire ? "regle-papier" : "regle"
          } ${i === MARQUE.conditions.length - 1 ? (claire ? "border-b border-b-papier-reglure" : "border-b border-b-reglure") : ""}`}
        >
          <dt
            className={`text-mention ${claire ? "text-papier-encre-douce" : "text-encre-douce"}`}
          >
            {libelle}
          </dt>
          <dd
            className={`text-right text-[0.9375rem] font-medium ${
              // Un seul signal or : la première ligne, « aucun versement ».
              i === 0
                ? claire
                  ? "text-or-encre"
                  : "text-or-clair"
                : claire
                  ? "text-papier-encre"
                  : "text-encre"
            }`}
          >
            {valeur}
          </dd>
        </div>
      ))}
    </dl>
  );
}
