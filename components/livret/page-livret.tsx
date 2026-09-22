"use client";

import { useEffect, useRef, ViewTransition, type ReactNode } from "react";
import { entreePage, inscrireEntrees, useScene } from "@/lib/tunnel/gsap";

/**
 * Chemin de la page ouverte en premier. Toute autre page montée ensuite est
 * une navigation interne. (Un simple drapeau serait trompé par le double
 * montage des effets en développement.)
 */
let cheminInitial: string | null = null;

const PAGE = {
  "page-avant": "page-avant",
  "page-arriere": "page-arriere",
  default: "none",
} as const;

/**
 * Une page du livret.
 *
 * Elle tourne à l'entrée et à la sortie selon le sens de la navigation (types
 * `page-avant` / `page-arriere` posés sur les liens), inscrit ses entrées le
 * long de la réglure au défilement, et donne le focus à son titre après un
 * changement de page, pour que le lecteur d'écran reparte du bon endroit.
 */
export function PageLivret({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const racine = useRef<HTMLElement>(null);

  useScene(({ mouvement }) => {
    if (!racine.current) return;
    cheminInitial ??= window.location.pathname;
    const navigation = window.location.pathname !== cheminInitial;
    // Le filet de <head> a pu lever le masquage si l'application a tardé : le
    // mouvement se joue quand même, simplement depuis l'état visible.
    entreePage(racine.current, { mouvement, navigation });
    return inscrireEntrees(racine.current, { mouvement });
  });

  useEffect(() => {
    // Au premier chargement, le focus reste au début du document (lien
    // d'évitement). Après une navigation interne, il va au titre de la page.
    if (!sessionStorage.getItem("livret:ouvert")) {
      try {
        sessionStorage.setItem("livret:ouvert", "1");
      } catch {}
      return;
    }
    racine.current
      ?.querySelector<HTMLElement>("h1")
      ?.focus({ preventScroll: true });
  }, []);

  return (
    <ViewTransition enter={PAGE} exit={PAGE} default="none">
      <main
        ref={racine}
        id="contenu"
        tabIndex={-1}
        className={`relative flex-1 pt-(--hauteur-entete) outline-none ${className}`}
      >
        {children}
      </main>
    </ViewTransition>
  );
}
