import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MARQUE, remplir } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { Conditions } from "@/components/livret/conditions";
import { PageLivret } from "@/components/livret/page-livret";
import { Sommaire } from "@/components/livret/sommaire";
import { CLES_PARCOURS, chemin, trouverParcours } from "@/lib/tunnel/livret";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLES_PARCOURS.map((parcours) => ({ parcours }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[parcours]">): Promise<Metadata> {
  const parcours = trouverParcours((await params).parcours);
  if (!parcours) return {};
  return { title: parcours.libelle, description: parcours.carteAccueil.accroche };
}

/** Le sommaire d'une branche : tous ses films, en réglure. */
export default async function PageSommaire({
  params,
}: PageProps<"/[parcours]">) {
  const parcours = trouverParcours((await params).parcours);
  if (!parcours) notFound();

  const autre = CLES_PARCOURS.find((cle) => cle !== parcours.cle)!;

  return (
    <PageLivret>
      <div className="px-(--gouttiere) pt-8 pb-24 livret:pt-14 livret:pb-32 livret:pl-(--reliure)">
        <header className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-4 pb-10 livret:grid-cols-12 livret:items-end livret:pb-14">
          <h1
            tabIndex={-1}
            className="max-w-[16ch] text-titre font-light text-encre outline-none livret:col-span-7"
          >
            {parcours.titreMenu}
          </h1>
          <p data-entree className="font-titre text-mention text-encre-sourde livret:col-span-7 livret:row-start-2">
            {MARQUE.sommaire.guide}
          </p>
          <p data-entree className="font-titre text-mention text-encre-douce livret:col-span-5 livret:justify-self-end livret:text-right">
            {parcours.carteAccueil.titre}
            <span aria-hidden="true" className="px-2 text-reglure-forte">
              ·
            </span>
            {remplir(MARQUE.sommaire.compte, { n: parcours.themes.length })}
            <br />
            <Link
              href={chemin.sommaire(autre)}
              transitionTypes={["page-avant"]}
              className="mt-1 inline-flex min-h-11 items-center text-or-clair underline decoration-or/40 hover:decoration-or-clair"
            >
              {MARQUE.sommaire.changer} {PARCOURS[autre].libelle.toLowerCase()}
            </Link>
          </p>
        </header>

        <Sommaire parcours={parcours} />

        <div className="mt-20 livret:grid livret:grid-cols-12 livret:gap-x-[clamp(2rem,5vw,6rem)]">
          <Conditions className="livret:col-span-6" />
        </div>
      </div>
    </PageLivret>
  );
}
