import { MARQUE } from "@/content/marque";
import { Engagement } from "@/components/livret/engagement";
import { IconeCoche } from "@/components/livret/icones";
import { Onglets } from "@/components/livret/onglets";
import { PageLivret } from "@/components/livret/page-livret";
import { Planche } from "@/components/livret/planche";

/**
 * La couverture du livret. Elle répond, dans cet ordre : de quoi il s'agit,
 * par où entrer, et ce qui ne se passera pas ici (aucun versement).
 */
export default function Couverture() {
  const { couverture } = MARQUE;
  return (
    <PageLivret>
      <div className="px-(--gouttiere) livret:pl-(--reliure)">
        <section
          aria-labelledby="titre-couverture"
          className="grid gap-x-[clamp(2rem,5vw,6rem)] pt-8 pb-16 livret:min-h-[calc(100svh-var(--hauteur-entete))] livret:grid-cols-12 livret:content-center livret:pt-6 livret:pb-20"
        >
          <div className="livret:col-span-6 livret:self-center">
            <h1
              id="titre-couverture"
              tabIndex={-1}
              className="max-w-[13ch] text-affiche font-light text-encre outline-none"
            >
              {couverture.titre}
            </h1>
            <p className="mt-6 max-w-[48ch] text-chapeau text-encre-douce livret:mt-8">
              {couverture.chapeau}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-titre text-mention text-encre livret:mt-10">
              {couverture.garanties.map((garantie, i) => (
                <li key={garantie} className="flex items-center gap-2">
                  <IconeCoche
                    className={`size-4 shrink-0 ${i === 0 ? "text-or-clair" : "text-encre-sourde"}`}
                  />
                  {garantie}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col livret:col-span-6 livret:mt-0 livret:self-center">
            <div className="order-last mt-12 livret:order-first livret:mt-0 livret:mb-10">
              <Planche
                video={couverture.film.video}
                titre={couverture.film.titre}
                sizes="(min-width: 64rem) 46vw, 100vw"
                prioritaire
                parallaxe
              />
            </div>
            <h2 className="sr-only">{couverture.choisir}</h2>
            <Onglets titreNiveau="h3" />
          </div>
        </section>

        <div className="livret:grid livret:grid-cols-12">
          <div className="livret:col-span-10">
            <Engagement />
          </div>
        </div>

        <section className="pb-24 livret:grid livret:grid-cols-12 livret:gap-x-[clamp(2rem,5vw,6rem)] livret:pb-32">
          <div className="livret:col-span-6 livret:col-start-7">
            <h2 className="font-titre text-intertitre font-light text-encre">
              {couverture.cloture}
            </h2>
            <Onglets compact className="mt-5" titreNiveau="h3" />
          </div>
        </section>
      </div>
    </PageLivret>
  );
}
