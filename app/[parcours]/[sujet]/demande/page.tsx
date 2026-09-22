import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARQUE } from "@/content/marque";
import { Conditions } from "@/components/livret/conditions";
import { FicheAvecObjet, FicheDemande } from "@/components/livret/fiche-demande";
import { PageLivret } from "@/components/livret/page-livret";
import { sujetsAvecFiche, trouverSujet } from "@/lib/tunnel/livret";

export const dynamicParams = false;

/** Seuls les sujets dont un formulaire est rempli sur le tunnel ont ces pages. */
export function generateStaticParams() {
  return sujetsAvecFiche();
}

export async function generateMetadata({
  params,
}: PageProps<"/[parcours]/[sujet]/demande">): Promise<Metadata> {
  const { parcours, sujet } = await params;
  const trouve = trouverSujet(parcours, sujet);
  if (!trouve) return {};
  return {
    title: `${MARQUE.demande.titre} · ${trouve.sujet.titre}`,
    robots: { index: false },
  };
}

/**
 * La fiche de demande. À gauche, sur la nuit : ce qui se passe après l'envoi,
 * pour que le visiteur sache à quoi il s'engage avant d'écrire. À droite, la
 * page claire où il inscrit sa ligne.
 */
export default async function PageDemande({
  params,
}: PageProps<"/[parcours]/[sujet]/demande">) {
  const { parcours: cleParcours, sujet: cleSujet } = await params;
  const trouve = trouverSujet(cleParcours, cleSujet);
  if (!trouve) notFound();
  const { parcours, sujet } = trouve;
  const { demande } = MARQUE;

  return (
    <PageLivret>
      <div className="grid gap-x-[clamp(2rem,5vw,6rem)] px-(--gouttiere) pt-8 pb-24 livret:grid-cols-12 livret:pt-14 livret:pb-32 livret:pl-(--reliure)">
        <header className="livret:col-span-5 livret:row-span-2">
          <h1
            tabIndex={-1}
            className="text-titre font-light text-encre outline-none"
          >
            {demande.titre}
          </h1>
          <p data-entree className="mt-3 font-titre text-intertitre font-light text-or-clair">
            {sujet.titre}
          </p>
          <p data-entree className="mt-5 max-w-[44ch] text-chapeau text-encre-douce">
            {demande.chapeau}
          </p>

          <section
            aria-labelledby="titre-ensuite"
            className="mt-12 hidden livret:block"
          >
            <Ensuite />
          </section>
        </header>

        <div data-entree className="mt-10 -mx-(--gouttiere) sm:mx-0 livret:col-span-7 livret:mt-0">
          <Suspense
            fallback={<FicheDemande parcours={parcours} sujet={sujet} />}
          >
            <FicheAvecObjet parcours={parcours} sujet={sujet} />
          </Suspense>
        </div>

        <section aria-labelledby="titre-ensuite-mobile" className="mt-14 livret:hidden">
          <Ensuite mobile />
        </section>
      </div>
    </PageLivret>
  );
}

function Ensuite({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <h2
        id={mobile ? "titre-ensuite-mobile" : "titre-ensuite"}
        className="font-titre text-intertitre font-light text-encre"
      >
        {MARQUE.demande.ensuite}
      </h2>
      <ol className="mt-5 border-b border-reglure">
        {MARQUE.recu.suites.map((suite, i) => (
          <li
            key={suite}
            data-inscrire
            className="regle grid grid-cols-[2rem_minmax(0,1fr)] py-4 text-[0.9375rem] leading-relaxed text-encre-douce"
          >
            <span aria-hidden="true" className="font-titre tabular-nums text-encre-sourde">
              {i + 1}
            </span>
            {suite}
          </li>
        ))}
      </ol>
      <Conditions className="mt-10" />
    </>
  );
}
