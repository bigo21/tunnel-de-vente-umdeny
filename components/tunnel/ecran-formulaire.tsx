"use client";

import { MARQUE } from "@/content/marque";
import type { Demande, Parcours } from "@/lib/tunnel/types";

const CLASSE_CHAMP =
  "min-w-0 rounded-marque border border-bordure-forte bg-fond-carte px-[14px] py-[13px] text-[14.5px] text-encre placeholder:text-encre-faible";
// La charte Vireel n'utilise pas de capitales espacées pour les intitulés de
// champ : l'étiquette est en graisse 600, à la taille du texte courant.
const CLASSE_INTITULE = "text-[12px] font-semibold text-encre-douce";

const ECHEANCES = [
  "Dans les 15 jours",
  "Dans le mois",
  "Dans les trois mois",
  "Je m'informe seulement",
];

/**
 * Étape 3 : la capture. Six champs, et seuls le nom, le téléphone et le
 * consentement sont exigés — le reste qualifie sans bloquer.
 */
export function EcranFormulaire({
  parcours,
  titre,
  demande,
  onChange,
  onEnvoyer,
  onRetour,
  erreur,
  enCours,
}: {
  parcours: Parcours;
  titre: string;
  demande: Demande;
  onChange: (modification: Partial<Demande>) => void;
  onEnvoyer: () => void;
  onRetour: () => void;
  erreur: string | null;
  enCours: boolean;
}) {
  const teinte =
    parcours.teinte === "accent" ? "text-accent-clair" : "text-encre";

  return (
    <main className="anim-entree flex flex-1 justify-center px-[clamp(16px,4vw,48px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(24px,4vw,52px)]">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onEnvoyer();
        }}
        className="flex w-full max-w-[620px] flex-col gap-[22px]"
      >
        <div className="flex flex-col gap-2.5">
          <span className={`surtitre ${teinte}`}>
            {parcours.libelle} · Étape 3
          </span>
          <h1 className="titre text-balance text-[clamp(22px,3.6vw,32px)] leading-[1.08]">
            {titre}
          </h1>
          <p className="text-[14px] leading-[1.6] text-encre-sourde">
            {MARQUE.formulaire.intro}
          </p>
        </div>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          <label className="flex flex-col gap-1.5">
            <span className={CLASSE_INTITULE}>Nom et prénom</span>
            <input
              name="nom"
              autoComplete="name"
              value={demande.nom}
              onChange={(e) => onChange({ nom: e.target.value })}
              placeholder="Ex. Awa Diallo"
              aria-invalid={erreur !== null && demande.nom.trim() === ""}
              className={CLASSE_CHAMP}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={CLASSE_INTITULE}>Téléphone</span>
            <input
              name="telephone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={demande.telephone}
              onChange={(e) => onChange({ telephone: e.target.value })}
              placeholder="+221 77 000 00 00"
              aria-invalid={erreur !== null && demande.telephone.trim() === ""}
              className={CLASSE_CHAMP}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={CLASSE_INTITULE}>Email</span>
            <input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={demande.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="awa@exemple.com"
              className={CLASSE_CHAMP}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={CLASSE_INTITULE}>Ville et pays</span>
            <input
              name="ville"
              autoComplete="address-level2"
              value={demande.ville}
              onChange={(e) => onChange({ ville: e.target.value })}
              placeholder="Dakar, Sénégal"
              className={CLASSE_CHAMP}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={CLASSE_INTITULE}>{parcours.questionQualification}</span>
          <select
            name="qualification"
            value={demande.qualification}
            onChange={(e) => onChange({ qualification: e.target.value })}
            className={CLASSE_CHAMP}
          >
            <option value="">Choisir…</option>
            {parcours.optionsQualification.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={CLASSE_INTITULE}>Votre échéance</span>
          <select
            name="echeance"
            value={demande.echeance}
            onChange={(e) => onChange({ echeance: e.target.value })}
            className={CLASSE_CHAMP}
          >
            <option value="">Choisir…</option>
            {ECHEANCES.map((echeance) => (
              <option key={echeance} value={echeance}>
                {echeance}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-start gap-3 text-[13px] leading-[1.55] text-encre-sourde">
          <input
            type="checkbox"
            name="consentement"
            checked={demande.consentement}
            onChange={(e) => onChange({ consentement: e.target.checked })}
            aria-invalid={erreur !== null && !demande.consentement}
            className="mt-0.5 size-5 flex-none accent-accent"
          />
          <span>{MARQUE.formulaire.consentement}</span>
        </label>

        {erreur && (
          <p
            role="alert"
            className="m-0 border-l-[3px] border-accent bg-[rgba(221,99,22,0.10)] px-[14px] py-2.5 text-[13px] text-accent-clair"
          >
            {erreur}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-[14px]">
          <button
            type="submit"
            disabled={enCours}
            className="bouton-accent cursor-pointer rounded-marque px-7 py-[15px] text-[15px] font-semibold disabled:cursor-progress disabled:opacity-70"
          >
            {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
          <button
            type="button"
            onClick={onRetour}
            className="cursor-pointer border-b border-encre-faible py-2 text-[13.5px] text-encre-sourde transition-colors hover:text-accent-clair"
          >
            Revenir à la vidéo
          </button>
        </div>

        <p className="m-0 text-[12px] leading-[1.6] text-encre-faible">
          {MARQUE.formulaire.mentionDonnees}
        </p>
      </form>
    </main>
  );
}
