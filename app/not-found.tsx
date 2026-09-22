import Link from "next/link";
import { MARQUE } from "@/content/marque";
import { IconeRetour } from "@/components/livret/icones";

/** Page absente du livret : on renvoie à la couverture, rien d'autre. */
export default function Introuvable() {
  const { introuvable } = MARQUE;
  return (
    <main
      id="contenu"
      className="flex flex-1 flex-col justify-center px-(--gouttiere) pt-(--hauteur-entete) pb-24 livret:pl-(--reliure)"
    >
      <h1 className="max-w-[18ch] text-titre font-light text-encre">
        {introuvable.titre}
      </h1>
      <p className="mt-5 max-w-[44ch] text-chapeau text-encre-douce">
        {introuvable.texte}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center gap-2 font-titre text-or-clair underline decoration-or/40 underline-offset-4 hover:decoration-or-clair"
      >
        <IconeRetour className="size-4" />
        {introuvable.action}
      </Link>
    </main>
  );
}
