"use client";

import { useRef } from "react";
import { MARQUE } from "@/content/marque";
import { gsap, useScene } from "@/lib/tunnel/gsap";

/**
 * La phrase d'engagement, épinglée à l'écran et révélée mot à mot au
 * défilement : le visiteur la lit au rythme où il avance, et elle se termine
 * sur le seul mot d'or de la section, « contrat écrit ».
 *
 * Sans mouvement (préférence du visiteur ou script absent), la section n'est
 * pas épinglée et la phrase s'affiche entière.
 */
export function Engagement() {
  const piste = useRef<HTMLDivElement>(null);
  const phrase = MARQUE.couverture.engagement;
  const signal = MARQUE.couverture.engagementSignal;
  const mots = phrase.split(" ");
  // Le signal clôt la phrase : ses mots sont les derniers.
  const rangSignal = phrase.endsWith(signal)
    ? mots.length - signal.split(" ").length
    : -1;

  useScene(({ mouvement }) => {
    const element = piste.current;
    if (!element) return;
    const spans = element.querySelectorAll<HTMLElement>("[data-mot]");
    if (!mouvement) {
      gsap.set(spans, { opacity: 1 });
      return;
    }
    const ligne = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });
    ligne.fromTo(
      spans,
      { opacity: 0.16 },
      { opacity: 1, ease: "none", stagger: 0.12, duration: 0.3 },
    );
  });

  return (
    <div
      ref={piste}
      className="relative [.js-mouvement_&]:h-[230svh] livret:[.js-mouvement_&]:h-[260vh]"
    >
      <div className="flex items-center py-24 [.js-mouvement_&]:sticky [.js-mouvement_&]:top-0 [.js-mouvement_&]:h-svh [.js-mouvement_&]:py-0">
        <p className="sr-only">{phrase}</p>
        <p
          aria-hidden="true"
          className="max-w-[22ch] font-titre text-titre font-light text-encre livret:max-w-[24ch]"
        >
          {mots.map((mot, i) => (
            <span
              key={i}
              data-mot
              className={
                i >= rangSignal && rangSignal !== -1 ? "text-or-clair" : undefined
              }
            >
              {mot}
              {i < mots.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
