"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { MARQUE, remplir } from "@/content/marque";
import { WHATSAPP as whatsapp } from "@/content/whatsapp";
import { CLE_RECU, ENVOI_BRANCHE, type Recu as DonneesRecu } from "@/lib/tunnel/envoi";
import { chemin } from "@/lib/tunnel/livret";
import type { Parcours, Theme } from "@/lib/tunnel/types";
import { IconeMessage, IconeSuite } from "./icones";

/** Le reçu ne change pas pendant la visite : aucun abonnement nécessaire. */
const sansAbonnement = () => () => {};
function lireStockage(): string | null {
  try {
    return window.sessionStorage.getItem(CLE_RECU);
  } catch {
    return null;
  }
}

/**
 * Le reçu : la ligne inscrite revient contresignée.
 *
 * C'est le seul écran du tunnel où WhatsApp apparaît, et seulement si une
 * demande a bien été envoyée depuis cet appareil. Sans demande, le reçu le
 * dit et renvoie vers la fiche, sans aucun lien WhatsApp.
 */
export function Recu({ parcours, sujet }: { parcours: Parcours; sujet: Theme }) {
  // `undefined` : rendu serveur ; `null` : aucune demande envoyée.
  const brut = useSyncExternalStore(sansAbonnement, lireStockage, () => undefined);
  const recu = useMemo<DonneesRecu | null | undefined>(() => {
    if (brut === undefined) return undefined;
    try {
      const lu = brut ? (JSON.parse(brut) as DonneesRecu) : null;
      return lu && lu.sujet === sujet.cle ? lu : null;
    } catch {
      return null;
    }
  }, [brut, sujet.cle]);
  const titre = useRef<HTMLHeadingElement>(null);
  const { recu: textes } = MARQUE;

  useEffect(() => {
    if (recu !== undefined) titre.current?.focus({ preventScroll: true });
  }, [recu]);

  if (recu === undefined) {
    return <div aria-busy="true" className="min-h-[60svh]" />;
  }

  if (recu === null) {
    return (
      <div className="max-w-[40rem]">
        <h1
          ref={titre}
          tabIndex={-1}
          data-tardif
          className="text-titre font-light text-encre outline-none"
        >
          {textes.absent.titre}
        </h1>
        <p className="mt-5 text-chapeau text-encre-douce">{textes.absent.texte}</p>
        <Link
          href={chemin.demande(parcours.cle, sujet.cle)}
          className="bouton-or mt-8 inline-flex min-h-14 items-center gap-4 px-6 font-titre font-medium"
        >
          {textes.absent.action}
          <IconeSuite className="size-5" />
        </Link>
      </div>
    );
  }

  const prenom = recu.nom.split(/\s+/)[0] ?? "";
  // Une demande de document ne se confirme pas comme une demande de rappel.
  const variante = recu.formulaire?.startsWith("document")
    ? textes.document
    : textes;
  const titreRecu = ENVOI_BRANCHE ? variante.titre : variante.titreDemo;
  const texteRecu = ENVOI_BRANCHE ? variante.texte : variante.texteDemo;
  const lignes = [
    { libelle: textes.objet, valeur: recu.objet },
    { libelle: textes.sujet, valeur: sujet.titre },
    { libelle: textes.numero, valeur: recu.telephone },
    { libelle: textes.delai, valeur: textes.delaiValeur },
  ];

  return (
    <div className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-14 livret:grid-cols-12">
      <section className="page-claire relative overflow-clip -mx-(--gouttiere) bg-papier px-5 pt-9 pb-9 text-papier-encre shadow-(--ombre-feuille) sm:mx-0 sm:px-9 livret:col-span-7 livret:px-12 livret:pt-12">
        <span
          aria-hidden="true"
          className="tampon tampon-pose absolute top-6 right-5 border-or-encre !bg-transparent !text-or-encre sm:right-9 livret:top-10 livret:right-12"
        >
          {ENVOI_BRANCHE ? textes.tampon : textes.tamponDemo}
        </span>
        <h1
          ref={titre}
          tabIndex={-1}
          data-tardif
          className="max-w-[14ch] pr-28 text-titre font-light text-papier-encre outline-none"
        >
          {titreRecu}
        </h1>
        <p className="mt-5 max-w-[46ch] text-papier-encre-douce">
          {remplir(texteRecu, { prenom })}
        </p>
        {!ENVOI_BRANCHE && (
          <p className="mt-4 bg-papier-releve px-4 py-3 font-titre text-mention text-papier-encre-douce">
            {textes.envoiProvisoire}
          </p>
        )}

        <dl className="mt-8 border-b border-papier-reglure font-titre">
          {lignes.map(({ libelle, valeur }) => (
            <div
              key={libelle}
              className="regle-papier grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 py-3.5"
            >
              <dt className="text-mention text-papier-encre-douce">{libelle}</dt>
              <dd className="text-right text-[0.9375rem] font-medium break-words text-papier-encre">
                {valeur}
              </dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 font-titre text-lg font-medium text-papier-encre">
          {textes.suitesTitre}
        </h2>
        <ol className="mt-3">
          {textes.suites.map((suite, i) => (
            <li
              key={suite}
              className="regle-papier grid grid-cols-[2rem_minmax(0,1fr)] py-3.5 text-[0.9375rem] leading-relaxed text-papier-encre-douce"
            >
              <span aria-hidden="true" className="font-titre tabular-nums text-papier-encre-sourde">
                {i + 1}
              </span>
              {suite}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titre-whatsapp" className="livret:col-span-5 livret:pt-12">
        <h2
          id="titre-whatsapp"
          className="font-titre text-intertitre font-light text-encre"
        >
          {whatsapp.titre}
        </h2>
        <ul className="mt-5 border-b border-reglure">
          {[
            { lien: whatsapp.conseiller, libelle: whatsapp.libelleConseiller },
            { lien: whatsapp.chaine, libelle: whatsapp.libelleChaine },
          ].map(({ lien, libelle }) => (
            <li key={libelle} className="regle">
              {lien ? (
                <a
                  href={lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 py-4 font-titre text-encre transition-colors hover:text-or-clair"
                >
                  <IconeMessage className="size-6 shrink-0 text-or-clair" />
                  <span className="flex-1">{libelle}</span>
                  <IconeSuite className="size-5 shrink-0 transition-transform duration-300 ease-livre group-hover:translate-x-1" />
                </a>
              ) : (
                <p className="flex min-h-16 items-center gap-4 py-4 font-titre text-encre-douce">
                  <IconeMessage className="size-6 shrink-0 text-encre-sourde" />
                  <span className="flex-1">
                    {libelle}
                    <span className="mt-0.5 block text-mention text-encre-sourde">
                      {whatsapp.mentionAFournir}
                    </span>
                  </span>
                </p>
              )}
            </li>
          ))}
        </ul>

        <Link
          href={chemin.sommaire(parcours.cle)}
          transitionTypes={["page-arriere"]}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-titre text-or-clair underline decoration-or/40 underline-offset-4 hover:decoration-or-clair"
        >
          {textes.retour}
        </Link>
      </section>
    </div>
  );
}
