"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/tunnel/gsap";

type Mesure = { libelle: string; valeur: string; bon: boolean | null };

/**
 * Relevé de ce que l'appareil accepte, pour lever le doute quand le mouvement
 * ne se joue pas : c'est presque toujours le réglage système d'accessibilité.
 *
 * Le carré doré au-dessus du relevé est la preuve visuelle : s'il ne bouge
 * pas alors que « Mouvement réduit » indique « non », le script est en cause.
 */
function relever(): Mesure[] {
  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const racine = document.documentElement;
  const webgl = (() => {
    try {
      return Boolean(document.createElement("canvas").getContext("webgl2"));
    } catch {
      return false;
    }
  })();

  return [
    {
      libelle: "Mouvement réduit demandé par l'appareil",
      valeur: reduit ? "oui — le site coupe alors tout mouvement" : "non",
      bon: !reduit,
    },
    {
      libelle: "Script de l'application démarré",
      valeur: racine.classList.contains("js-pret") ? "oui" : "non",
      bon: racine.classList.contains("js-pret"),
    },
    {
      libelle: "Animations d'entrée armées",
      valeur: racine.classList.contains("js-mouvement")
        ? "oui"
        : "non — contenu affiché sans animation",
      bon: racine.classList.contains("js-mouvement"),
    },
    {
      libelle: "Transitions entre pages",
      valeur:
        typeof document.startViewTransition === "function"
          ? "prises en charge"
          : "non prises en charge par ce navigateur",
      bon: typeof document.startViewTransition === "function",
    },
    { libelle: "WebGL (aperçu des films)", valeur: webgl ? "oui" : "non", bon: null },
    {
      libelle: "Pointeur fin (souris)",
      valeur: window.matchMedia("(pointer: fine)").matches
        ? "oui"
        : "non — écran tactile, défilement inertiel du système",
      bon: null,
    },
    {
      libelle: "Temps de démarrage",
      valeur: `${Math.round(performance.now())} ms`,
      bon: performance.now() < 2500,
    },
    { libelle: "Navigateur", valeur: navigator.userAgent, bon: null },
  ];
  }
/** Le relevé est fait une seule fois, puis mémorisé : le rendu reste pur. */
let memoire: Mesure[] | null = null;
function releve(): Mesure[] {
  memoire ??= relever();
  return memoire;
}

export function Diagnostic() {
  // Relevé fait au rendu client (jamais au rendu serveur, où rien de tout
  // ceci n'existe).
  const cote = useSyncExternalStore(
    () => () => {},
    () => "client" as const,
    () => null,
  );
  const temoin = useRef<HTMLDivElement>(null);
  const mesures = cote === "client" ? releve() : null;



  // Témoin : une boucle continue, indépendante du défilement.
  useEffect(() => {
    if (!temoin.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(temoin.current, {
        x: 180,
        rotation: 90,
        duration: 1.4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => media.revert();
  }, []);

  return (
    <div className="mx-auto max-w-[44rem] pt-10">
      <h1 className="text-titre font-light text-encre">Diagnostic du mouvement</h1>
      <p className="mt-4 text-encre-douce">
        Ouvrez cette page sur l&apos;appareil où les animations manquent. Le carré
        doré doit faire des allers-retours ; s&apos;il reste immobile, le relevé
        ci-dessous en donne la raison.
      </p>

      <noscript>
        <p className="mt-8 bg-nuit-releve px-4 py-3 text-[0.9375rem] text-alerte">
          Le JavaScript ne s&apos;exécute pas sur cette page. En développement,
          c&apos;est presque toujours l&apos;adresse : Next ne sert ses scripts
          qu&apos;aux origines autorisées (voir allowedDevOrigins dans
          next.config.ts). Ouvrez le site en production, ou ajoutez
          l&apos;adresse utilisée par l&apos;appareil.
        </p>
      </noscript>

      <div className="mt-8 overflow-hidden border-y border-reglure py-6">
        <div ref={temoin} className="size-12 bg-or" aria-hidden="true" />
      </div>

      <dl className="mt-8">
        {mesures?.map(({ libelle, valeur, bon }) => (
          <div
            key={libelle}
            className="regle grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <dt className="font-titre text-mention text-encre-douce">{libelle}</dt>
            <dd
              className={`text-[0.9375rem] break-words sm:text-right ${
                bon === null
                  ? "text-encre"
                  : bon
                    ? "text-or-clair"
                    : "text-alerte"
              }`}
            >
              {valeur}
            </dd>
          </div>
        ))}
        {!mesures && (
          <p className="py-4 text-encre-sourde" aria-live="polite">
            Relevé en cours… S&apos;il reste affiché, c&apos;est que le script
            de la page ne s&apos;exécute pas : voir la note ci-dessous.
          </p>
        )}
      </dl>

      <p className="mt-8 font-titre text-mention text-encre-sourde">
        Relevé bloqué ou page figée sur un autre appareil : vérifiez
        l&apos;adresse d&apos;accès. En développement, seules les origines
        listées dans next.config.ts reçoivent les scripts ; en production, il
        n&apos;y a pas cette restriction.
      </p>
      <p className="mt-3 font-titre text-mention text-encre-sourde">
        Si « Mouvement réduit » indique oui : Android, Paramètres → Accessibilité →
        Supprimer les animations. iPhone, Réglages → Accessibilité → Mouvement →
        Réduire les animations.
      </p>
    </div>
  );
}
