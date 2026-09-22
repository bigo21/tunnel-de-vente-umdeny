"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MARQUE, remplir } from "@/content/marque";
import { ETAPES_TOTAL, etapeDepuisChemin } from "@/lib/tunnel/livret";

/**
 * Le fil de reliure : la signature du livret.
 *
 * Un fil unique, cousu dans la marge, découpé en quatre segments, un par étape
 * du tunnel. Les étapes franchies sont en or plein ; le segment de l'étape en
 * cours est allumé en or voilé et se remplit d'or plein au fil de la lecture. Sur bureau il court dans
 * la marge gauche, sur téléphone sous l'en-tête.
 *
 * Il ne se déplace jamais pendant les changements de page : c'est le repère
 * fixe du parcours (voir `view-transition-name: fil`).
 */
export function FilDeReliure() {
  const pathname = usePathname();
  const etape = etapeDepuisChemin(pathname);
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = racine.current;
    if (!element) return;
    let demande = 0;

    const mesurer = () => {
      demande = 0;
      const course =
        document.documentElement.scrollHeight - window.innerHeight;
      const avancee = course > 8 ? Math.min(1, window.scrollY / course) : 1;
      element.style.setProperty("--avancee", avancee.toFixed(4));
    };
    const planifier = () => {
      if (!demande) demande = requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    const observateur = new ResizeObserver(planifier);
    observateur.observe(document.body);
    return () => {
      cancelAnimationFrame(demande);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      observateur.disconnect();
    };
  }, [pathname]);

  return (
    <div
      ref={racine}
      style={{ viewTransitionName: "fil" }}
      className="pointer-events-none fixed inset-x-0 top-(--hauteur-entete) z-(--z-fil) flex h-[2px] gap-[3px] px-(--gouttiere) livret:inset-x-auto livret:bottom-8 livret:left-[calc(var(--reliure)/2)] livret:h-auto livret:w-[2px] livret:flex-col livret:px-0 livret:pt-6 livret:[--sens:scaleY(var(--avancee,0))]"
    >
      {Array.from({ length: ETAPES_TOTAL }, (_, i) => {
        const n = i + 1;
        // Le reçu clôt le livret : sa dernière étape est pleine d'emblée.
        const etat =
          n < etape || (n === etape && etape === ETAPES_TOTAL)
            ? "passe"
            : n === etape
              ? "courant"
              : "avenir";
        return (
          <span
            key={n}
            data-etat={etat}
            className={`relative flex-1 overflow-hidden ${
              etat === "courant" ? "bg-or/45" : "bg-reglure"
            }`}
          >
            <span
              className="absolute inset-0 origin-left bg-or livret:origin-top data-[e=avenir]:hidden"
              data-e={etat}
              style={
                etat === "courant"
                  ? {
                      transform:
                        "var(--sens, scaleX(var(--avancee, 0)))",
                    }
                  : undefined
              }
            />
          </span>
        );
      })}
      <p className="sr-only" aria-live="polite">
        {remplir(MARQUE.interface.etape, { n: etape, total: ETAPES_TOTAL })} :{" "}
        {MARQUE.interface.etapes[etape - 1]}
      </p>
    </div>
  );
}
