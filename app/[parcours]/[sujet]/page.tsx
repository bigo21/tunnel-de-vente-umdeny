import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MARQUE, remplir } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { BarreAction } from "@/components/livret/barre-action";
import { Conditions } from "@/components/livret/conditions";
import { IconeRetour, IconeSuite } from "@/components/livret/icones";
import { PageLivret } from "@/components/livret/page-livret";
import { Planche } from "@/components/livret/planche";
import { CLES_PARCOURS, chemin, trouverSujet } from "@/lib/tunnel/livret";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLES_PARCOURS.flatMap((parcours) =>
    PARCOURS[parcours].themes.map((t) => ({ parcours, sujet: t.cle })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[parcours]/[sujet]">): Promise<Metadata> {
  const { parcours, sujet } = await params;
  const trouve = trouverSujet(parcours, sujet);
  if (!trouve) return {};
  return { title: trouve.sujet.titre, description: trouve.sujet.accroche };
}

/**
 * La page d'un sujet : le film d'abord, puis trois entrées qui le précisent,
 * puis ce que le visiteur signera (rien, aujourd'hui) et l'action.
 *
 * Sur bureau, la planche reste épinglée à gauche pendant que les entrées
 * s'inscrivent à droite : on lit en gardant le film sous les yeux.
 */
export default async function PageSujet({
  params,
}: PageProps<"/[parcours]/[sujet]">) {
  const { parcours: cleParcours, sujet: cleSujet } = await params;
  const trouve = trouverSujet(cleParcours, cleSujet);
  if (!trouve) notFound();
  const { parcours, sujet, rang } = trouve;
  const { sujet: libelles } = MARQUE;

  const precedent = parcours.themes[rang - 1];
  const suivant = parcours.themes[rang + 1];
  const [principal, ...autres] = sujet.formulaires;

  const entrees = [
    { titre: libelles.contexte, texte: sujet.contexte },
    { titre: libelles.probleme, texte: sujet.probleme },
    { titre: libelles.solution, texte: sujet.solution },
  ];

  return (
    <PageLivret>
      <article className="px-(--gouttiere) pt-8 pb-28 livret:pt-14 livret:pb-32 livret:pl-(--reliure)">
        <header className="grid gap-x-[clamp(2rem,5vw,6rem)] pb-8 livret:grid-cols-12 livret:items-end livret:pb-12">
          <div className="max-w-[40rem] livret:col-span-7">
            <h1
              tabIndex={-1}
              className="text-titre font-light text-encre outline-none"
            >
              {sujet.titre}
            </h1>
            <p data-entree className="mt-4 text-chapeau text-encre-douce">{sujet.accroche}</p>
          </div>
          {/* Raccourci vers la demande, dès le premier écran sur bureau. */}
          <Link
            data-entree
            href={chemin.demande(parcours.cle, sujet.cle)}
            transitionTypes={["page-avant"]}
            className="hidden min-h-11 items-center gap-2 justify-self-start font-titre text-[0.9375rem] font-medium text-or-clair underline decoration-or/40 underline-offset-4 hover:decoration-or-clair livret:col-span-5 livret:inline-flex"
          >
            {libelles.action}
            <IconeSuite className="size-4" />
          </Link>
        </header>

        <div className="grid gap-x-[clamp(2rem,5vw,6rem)] livret:grid-cols-12">
          <div id="planche-sujet" className="-mx-(--gouttiere) livret:col-span-7 livret:mx-0">
            <div className="livret:sticky livret:top-[calc(var(--hauteur-entete)+2rem)]">
              <Planche
                video={sujet.video}
                titre={sujet.titre}
                nom={`planche-${parcours.cle}-${sujet.cle}`}
                sizes="(min-width: 64rem) 52vw, 100vw"
                prioritaire
                legendeClassName="px-(--gouttiere) livret:px-0"
                className="livret:shadow-(--ombre-planche)"
              />
            </div>
          </div>

          <div className="mt-10 livret:col-span-5 livret:mt-0">
            <dl>
              {entrees.map(({ titre, texte }) => (
                <div key={titre} data-inscrire className="regle pt-5 pb-8">
                  <dt className="font-titre text-mention font-medium tracking-[0.04em] text-encre-sourde">
                    {titre}
                  </dt>
                  <dd className="mt-2 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-encre livret:text-[1.125rem]">
                    {texte}
                  </dd>
                </div>
              ))}
            </dl>

            <section
              aria-labelledby="titre-engagement"
              className="mt-4 border-t border-reglure-forte pt-8"
            >
              <h2
                id="titre-engagement"
                className="font-titre text-intertitre font-light text-encre"
              >
                {libelles.engagementTitre}
              </h2>
              <p className="mt-3 max-w-[52ch] text-encre-douce">
                {libelles.engagementTexte}
              </p>
              <Conditions className="mt-6" />

              <Link
                id="action-sujet"
                href={chemin.demande(parcours.cle, sujet.cle)}
                transitionTypes={["page-avant"]}
                className="bouton-or mt-8 flex min-h-14 w-full items-center justify-between gap-4 px-6 font-titre text-base font-medium sm:w-auto sm:min-w-80"
              >
                {libelles.action}
                <IconeSuite className="size-5 shrink-0" />
              </Link>
              <p className="mt-3 font-titre text-mention text-encre-douce">
                {remplir(libelles.objetAction, { objet: principal })}
              </p>
              <p className="mt-1 font-titre text-mention text-encre-sourde">
                {MARQUE.demande.chapeau}
              </p>

              {autres.length > 0 && (
                <div className="mt-8">
                  <p className="font-titre text-mention text-encre-douce">
                    {libelles.autresDemandes}
                  </p>
                  <ul className="mt-1">
                    {autres.map((libelle, i) => (
                      <li key={libelle}>
                        <Link
                          href={chemin.demande(parcours.cle, sujet.cle, i + 2)}
                          transitionTypes={["page-avant"]}
                          className="inline-flex min-h-11 items-center gap-2 font-titre text-[0.9375rem] text-or-clair underline decoration-or/40 underline-offset-4 hover:decoration-or-clair"
                        >
                          {libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        </div>

        {(precedent || suivant) && (
          <nav
            aria-label={parcours.libelle}
            className="mt-20 grid gap-px border-y border-reglure sm:grid-cols-2 livret:mt-28"
          >
            {precedent ? (
              <Link
                href={chemin.sujet(parcours.cle, precedent.cle)}
                transitionTypes={["page-arriere"]}
                className="group flex min-h-20 flex-col justify-center gap-1 py-5 pr-4"
              >
                <span className="inline-flex items-center gap-2 font-titre text-mention text-encre-sourde">
                  <IconeRetour className="size-4" />
                  {libelles.precedent}
                </span>
                <span className="font-titre text-lg text-encre transition-colors group-hover:text-or-clair">
                  {precedent.titre}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {suivant && (
              <Link
                href={chemin.sujet(parcours.cle, suivant.cle)}
                transitionTypes={["page-avant"]}
                className="group flex min-h-20 flex-col justify-center gap-1 border-t border-reglure py-5 sm:items-end sm:border-t-0 sm:text-right"
              >
                <span className="inline-flex items-center gap-2 font-titre text-mention text-encre-sourde">
                  {libelles.suivant}
                  <IconeSuite className="size-4" />
                </span>
                <span className="font-titre text-lg text-encre transition-colors group-hover:text-or-clair">
                  {suivant.titre}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <BarreAction
        href={chemin.demande(parcours.cle, sujet.cle)}
        libelle={libelles.action}
        apres="planche-sujet"
        avant="action-sujet"
      />
    </PageLivret>
  );
}
