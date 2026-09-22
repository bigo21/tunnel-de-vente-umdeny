"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconeLienExterne } from "./icones";

/**
 * Barre d'action du téléphone : une fois la planche dépassée, l'action
 * principale reste à portée de pouce. Elle s'efface dès que l'action de la
 * page elle-même est à l'écran, pour ne jamais faire doublon ni masquer le
 * focus (voir `scroll-padding-bottom` dans globals.css).
 */
export function BarreAction({
  href,
  libelle,
  externe = false,
  apres,
  avant,
}: {
  href: string;
  /** Le formulaire est hébergé ailleurs : lien sortant, nouvel onglet. */
  externe?: boolean;
  libelle: string;
  /** Id de l'élément à dépasser avant d'afficher la barre. */
  apres: string;
  /** Id de l'élément qui, visible, masque la barre. */
  avant: string;
}) {
  const [depasse, setDepasse] = useState(false);
  const [cibleVisible, setCibleVisible] = useState(false);

  useEffect(() => {
    const debut = document.getElementById(apres);
    const fin = document.getElementById(avant);
    if (!debut || !fin) return;
    const o1 = new IntersectionObserver(([e]) =>
      setDepasse(!e.isIntersecting && e.boundingClientRect.top < 0),
    );
    const o2 = new IntersectionObserver(([e]) =>
      setCibleVisible(e.isIntersecting),
    );
    o1.observe(debut);
    o2.observe(fin);
    return () => {
      o1.disconnect();
      o2.disconnect();
    };
  }, [apres, avant]);

  const visible = depasse && !cibleVisible;

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-(--z-barre) border-t border-reglure bg-nuit/94 px-(--gouttiere) pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[translate,opacity] duration-500 ease-livre livret:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {externe ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bouton-or flex min-h-12 w-full items-center justify-center gap-2 px-5 font-titre text-[0.9375rem] font-medium"
        >
          {libelle}
          <IconeLienExterne className="size-4 shrink-0" />
        </a>
      ) : (
        <Link
          href={href}
          transitionTypes={["page-avant"]}
          className="bouton-or flex min-h-12 w-full items-center justify-center px-5 font-titre text-[0.9375rem] font-medium"
        >
          {libelle}
        </Link>
      )}
    </div>
  );
}
