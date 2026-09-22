"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  ViewTransition,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { MARQUE } from "@/content/marque";
import { chemin } from "@/lib/tunnel/livret";
import type { Parcours } from "@/lib/tunnel/types";
import {
  AFFICHE_HAUTEUR,
  AFFICHE_LARGEUR,
  VIDEOS_PROVISOIRES,
  afficheVideo,
} from "@/lib/tunnel/video";
import { IconeSuite } from "./icones";
import type { Vitrine } from "./vitrine-webgl";

const REQUETE_BUREAU = "(min-width: 64rem)";
function abonnerBureau(rappel: () => void) {
  const requete = window.matchMedia(REQUETE_BUREAU);
  requete.addEventListener("change", rappel);
  return () => requete.removeEventListener("change", rappel);
}

/** Donne un nom de transition à son contenu seulement quand `actif`. */
function Nommee({
  nom,
  actif,
  children,
}: {
  nom: string;
  actif: boolean;
  children: ReactNode;
}) {
  if (!actif) return <>{children}</>;
  return (
    <ViewTransition name={nom} share="planche" default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * Le sommaire d'une branche : les films en réglure, une ligne par sujet.
 *
 * Sur téléphone, chaque ligne porte sa propre vignette. Sur bureau, les
 * vignettes quittent les lignes pour une vitrine unique, épinglée à droite,
 * qui montre le film de la ligne survolée ou atteinte au clavier. Quand WebGL
 * est disponible (pointeur fin, mouvement accepté), la vitrine passe d'un film
 * à l'autre par un fondu de déplacement et ondule sous le pointeur ; sinon,
 * elle se contente d'un fondu enchaîné.
 *
 * La vitrine et la vignette de ligne portent le même nom de transition que la
 * planche de la page sujet : l'image garde sa place d'une page à l'autre.
 */
export function Sommaire({ parcours }: { parcours: Parcours }) {
  const [actif, setActif] = useState(0);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const toile = useRef<HTMLCanvasElement>(null);
  const cadre = useRef<HTMLDivElement>(null);
  const vitrine = useRef<Vitrine | null>(null);
  const [webgl, setWebgl] = useState(false);
  // Deux éléments ne peuvent pas porter le même nom de transition : sur
  // bureau c'est la vitrine, sur téléphone la vignette de ligne.
  const bureau = useSyncExternalStore(
    abonnerBureau,
    () => window.matchMedia(REQUETE_BUREAU).matches,
    () => null,
  );

  // Montage du moteur WebGL, seulement là où il a du sens.
  useEffect(() => {
    const conditions = window.matchMedia(
      "(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!conditions.matches || !toile.current) return;
    const essai = document.createElement("canvas").getContext("webgl2");
    if (!essai) return;

    let annule = false;
    const premiere = images.current[0];
    if (!premiere) return;

    const demarrer = async () => {
      if (!premiere.complete) {
        await new Promise((ok) =>
          premiere.addEventListener("load", ok, { once: true }),
        );
      }
      const { creerVitrine } = await import("./vitrine-webgl");
      if (annule || !toile.current) return;
      try {
        vitrine.current = creerVitrine(
          toile.current,
          premiere,
          () => reduit.matches,
          VIDEOS_PROVISOIRES,
        );
        setWebgl(true);
      } catch {
        // Contexte refusé par le navigateur : la vitrine reste en images.
      }
    };
    demarrer();

    const redimensionner = () => vitrine.current?.redimensionner();
    window.addEventListener("resize", redimensionner);
    return () => {
      annule = true;
      window.removeEventListener("resize", redimensionner);
      vitrine.current?.detruire();
      vitrine.current = null;
      setWebgl(false);
    };
  }, []);

  const montrer = (rang: number) => {
    if (rang === actif) return;
    setActif(rang);
    const image = images.current[rang];
    if (!vitrine.current || !image) return;
    if (image.complete) vitrine.current.montrer(image);
    else
      image.addEventListener("load", () => vitrine.current?.montrer(image), {
        once: true,
      });
  };

  const sujetActif = parcours.themes[actif];

  return (
    <div className="grid gap-x-[clamp(2rem,5vw,6rem)] livret:grid-cols-12">
      <ol className="border-b border-reglure livret:col-span-6">
        {parcours.themes.map((sujet, rang) => (
          <li key={sujet.cle} className="regle" data-inscrire>
            <Link
              href={chemin.sujet(parcours.cle, sujet.cle)}
              transitionTypes={["page-avant"]}
              onPointerEnter={() => montrer(rang)}
              onFocus={() => montrer(rang)}
              className="group block py-6 livret:py-7"
            >
              <span
                className={`inline-block rounded-sm border px-2 py-0.5 font-titre text-[0.6875rem] tracking-[0.1em] whitespace-nowrap uppercase transition-colors ${
                  rang === actif
                    ? "livret:border-or livret:text-or-clair"
                    : "border-reglure-forte text-encre-sourde"
                }`}
              >
                {sujet.etiquette}
              </span>
              <span className="mt-2.5 block min-w-0">
                <span className="block font-titre text-intertitre font-normal text-encre transition-colors group-hover:text-or-clair">
                  {sujet.titre}
                </span>
                <span className="mt-2 block max-w-[52ch] text-[0.9375rem] leading-snug text-encre-douce">
                  {sujet.accroche}
                </span>
                {/* Vignette de ligne : téléphone et tablette seulement. */}
                <span className="relative mt-5 block livret:hidden">
                  <Nommee
                    nom={`planche-${parcours.cle}-${sujet.cle}`}
                    actif={bureau === false}
                  >
                    <span className="relative block aspect-video overflow-hidden bg-nuit-releve">
                      <Image
                        src={sujet.illustration?.src ?? afficheVideo(sujet.video.id)}
                        width={AFFICHE_LARGEUR}
                        height={AFFICHE_HAUTEUR}
                        alt={sujet.illustration?.alt ?? ""}
                        sizes="(min-width: 64rem) 1px, 100vw"
                        loading={rang === 0 ? "eager" : "lazy"}
                        className={`size-full object-cover ${
                          !sujet.illustration && VIDEOS_PROVISOIRES
                            ? "planche-sourdine"
                            : ""
                        }`}
                      />
                      {!sujet.illustration && VIDEOS_PROVISOIRES && (
                        <span className="tampon absolute top-3 right-3">
                          {MARQUE.lecteur.imageProvisoire}
                        </span>
                      )}
                    </span>
                  </Nommee>
                </span>
                <span className="mt-4 flex items-center gap-2 font-titre text-mention text-encre-douce">
                  <span className="tabular-nums">{sujet.video.duree}</span>
                  <span aria-hidden="true" className="text-reglure-forte">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-or-clair">
                    {MARQUE.sommaire.regarder}
                    <IconeSuite className="size-4 transition-transform duration-300 ease-livre group-hover:translate-x-1" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Vitrine : bureau seulement. */}
      <div aria-hidden="true" className="hidden livret:col-span-6 livret:block">
        <div className="sticky top-[calc(var(--hauteur-entete)+2rem)]">
          <Nommee
            nom={`planche-${parcours.cle}-${sujetActif.cle}`}
            actif={bureau === true}
          >
            <div
              ref={cadre}
              data-devoiler
              className="relative aspect-video overflow-hidden bg-nuit-releve"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                vitrine.current?.pointer(
                  (e.clientX - r.left) / r.width,
                  (e.clientY - r.top) / r.height,
                  true,
                );
              }}
              onPointerLeave={() => vitrine.current?.pointer(0.5, 0.5, false)}
            >
              {parcours.themes.map((sujet, rang) => (
                <Image
                  key={sujet.cle}
                  ref={(el) => {
                    images.current[rang] = el;
                  }}
                  src={sujet.illustration?.src ?? afficheVideo(sujet.video.id)}
                  width={AFFICHE_LARGEUR}
                  height={AFFICHE_HAUTEUR}
                  alt=""
                  sizes="(min-width: 64rem) 44vw, 1px"
                  loading={rang === 0 ? "eager" : "lazy"}
                  fetchPriority={rang === 0 ? "high" : "auto"}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ease-livre ${VIDEOS_PROVISOIRES ? "planche-sourdine" : ""} ${
                    rang === actif ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <canvas
                ref={toile}
                className={`absolute inset-0 size-full transition-opacity duration-300 ${
                  webgl ? "opacity-100" : "opacity-0"
                }`}
              />
              {!sujetActif.illustration && VIDEOS_PROVISOIRES && (
                <span className="tampon absolute top-4 right-4">
                  {MARQUE.lecteur.imageProvisoire}
                </span>
              )}
            </div>
          </Nommee>
          <div className="mt-4 flex items-baseline justify-between gap-6 font-titre text-mention">
            <span className="text-encre-douce">{sujetActif.titre}</span>
            <span className="shrink-0 tabular-nums text-encre-sourde">
              {sujetActif.video.duree}
            </span>
          </div>
          {!sujetActif.illustration && VIDEOS_PROVISOIRES && (
            <p className="mt-1 font-titre text-mention text-encre-sourde">
              {MARQUE.lecteur.mentionImageProvisoire}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
