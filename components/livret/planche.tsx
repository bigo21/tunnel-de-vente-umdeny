"use client";

import { useRef, useState, ViewTransition } from "react";
import Image from "next/image";
import { MARQUE, remplir } from "@/content/marque";
import { gsap, useScene } from "@/lib/tunnel/gsap";
import {
  AFFICHE_HAUTEUR,
  AFFICHE_LARGEUR,
  VIDEOS_PROVISOIRES,
  afficheVideo,
  lecteurVideo,
  type Video,
} from "@/lib/tunnel/video";
import { IconeFermer, IconeLecture } from "./icones";

type Props = {
  video: Video;
  titre: string;
  /** Nom partagé entre deux pages : la planche garde sa place d'une page à l'autre. */
  nom?: string;
  sizes: string;
  /** Planche principale de la page : chargée tout de suite. */
  prioritaire?: boolean;
  /** Parallaxe discrète de l'image dans son cadre. */
  parallaxe?: boolean;
  className?: string;
  /** Classes de la légende, par exemple pour la remettre en marge quand la
   *  planche est à fond perdu. */
  legendeClassName?: string;
};

/**
 * La planche d'un film : une vignette collée dans le livret, tamponnée « film
 * provisoire » tant que les films définitifs ne sont pas livrés.
 *
 * Le lecteur YouTube n'est monté qu'au clic, sur le domaine sans cookie : rien
 * ne charge et rien n'est déposé avant le geste du visiteur. Il remplace la
 * vignette dans le même cadre, sans fenêtre modale.
 */
export function Planche({
  video,
  titre,
  nom,
  sizes,
  prioritaire = false,
  parallaxe = false,
  className = "",
  legendeClassName = "",
}: Props) {
  const [lecture, setLecture] = useState(false);
  const cadre = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLSpanElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);

  useScene(
    ({ mouvement }) => {
      if (!parallaxe || !mouvement || !image.current || !cadre.current) return;
      gsap.fromTo(
        image.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: cadre.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    [parallaxe],
  );

  const libelle = remplir(MARQUE.lecteur.libelleLecture, {
    titre,
    duree: video.duree,
  });

  const contenu = (
    <div
      ref={cadre}
      className={`relative isolate aspect-video overflow-hidden bg-nuit-releve ${className}`}
    >
      {lecture ? (
        <>
          <iframe
            src={lecteurVideo(video.id)}
            title={titre}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
          <button
            type="button"
            onClick={() => {
              setLecture(false);
              requestAnimationFrame(() => bouton.current?.focus());
            }}
            className="absolute top-2 right-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-nuit/85 text-encre transition-colors hover:bg-nuit"
          >
            <IconeFermer className="size-5" />
            <span className="sr-only">{MARQUE.sujet.fermer}</span>
          </button>
        </>
      ) : (
        <button
          ref={bouton}
          type="button"
          onClick={() => setLecture(true)}
          className="group absolute inset-0 block size-full cursor-pointer text-left"
        >
          <span className="sr-only">{libelle}</span>
          <span ref={image} className="absolute -inset-y-[6%] inset-x-0 block">
            <Image
              src={afficheVideo(video.id)}
              width={AFFICHE_LARGEUR}
              height={AFFICHE_HAUTEUR}
              alt=""
              sizes={sizes}
              loading={prioritaire ? "eager" : "lazy"}
              fetchPriority={prioritaire ? "high" : "auto"}
              className={`size-full object-cover transition-[filter,scale] duration-700 ease-livre group-hover:scale-[1.025] ${VIDEOS_PROVISOIRES ? "planche-sourdine" : ""}`}
            />
          </span>
          {/* Voile bas : garantit la lecture de la durée sur toute image. */}
          <span className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-nuit/95 via-nuit/60 to-transparent" />
          <span className="absolute bottom-0 left-0 flex items-center gap-3 p-4 livret:p-5">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-or text-sur-or shadow-(--ombre-lecture) transition-transform duration-300 ease-livre group-hover:scale-105 livret:size-14">
              <IconeLecture className="ml-0.5 size-5 livret:size-6" />
            </span>
            <span className="font-titre text-mention text-encre">
              {MARQUE.sujet.lire}
              <span className="block tabular-nums text-encre-douce">
                {video.duree}
              </span>
            </span>
          </span>
        </button>
      )}
      {VIDEOS_PROVISOIRES && !lecture && (
        <span className="tampon pointer-events-none absolute top-4 right-4">
          {MARQUE.lecteur.provisoire}
        </span>
      )}
    </div>
  );

  return (
    <figure className="relative">
      {nom ? (
        <ViewTransition name={nom} share="planche" default="none">
          {contenu}
        </ViewTransition>
      ) : (
        contenu
      )}
      {VIDEOS_PROVISOIRES && (
        <figcaption className={`mt-2 font-titre text-mention text-encre-sourde ${legendeClassName}`}>
          {MARQUE.lecteur.mentionProvisoire}
        </figcaption>
      )}
    </figure>
  );
}
