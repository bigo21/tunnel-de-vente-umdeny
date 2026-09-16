"use client";

import { MARQUE } from "@/content/marque";
import type { Demande, Parcours } from "@/lib/tunnel/types";

// 16px minimum sur mobile : en dessous, iOS zoome à la mise au point du champ.
const CLASSE_CHAMP =
  "min-h-12 min-w-0 border border-bordure-forte bg-fond-carte p-[14px] font-texte text-base text-encre placeholder:text-encre-faible sm:text-[15px]";
const CLASSE_INTITULE =
  "text-[11px] uppercase tracking-[0.14em] text-encre-douce";

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
    <main className="flex flex-1 justify-center px-4 pb-12 pt-7 sm:px-[clamp(16px,4vw,52px)] sm:pb-[clamp(40px,6vw,72px)] sm:pt-[clamp(26px,4vw,56px)]">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onEnvoyer();
        }}
        className="flex w-full max-w-[640px] flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <span className={`text-[11px] uppercase tracking-[0.24em] ${teinte}`}>
            {parcours.libelle} · Étape 3
          </span>
          <h1 className="text-balance text-[clamp(24px,4vw,36px)] font-light leading-[1.06]">
            {titre}
          </h1>
          <p className="font-texte text-[15px] leading-[1.65] text-encre-tenue">
            {MARQUE.formulaire.intro}
          </p>
        </div>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
          <label className="flex flex-col gap-[7px]">
            <span className={CLASSE_INTITULE}>Nom et prénom</span>
            <input
              name="nom"
              autoComplete="name"
              value={demande.nom}
              onChange={(e) => onChange({ nom: e.target.value })}
              placeholder="Awa Diallo"
              aria-invalid={erreur !== null && demande.nom.trim() === ""}
              className={CLASSE_CHAMP}
            />
          </label>
          <label className="flex flex-col gap-[7px]">
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
          <label className="flex flex-col gap-[7px]">
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
          <label className="flex flex-col gap-[7px]">
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

        <label className="flex flex-col gap-[7px]">
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

        <label className="flex flex-col gap-[7px]">
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

        <label className="font-texte flex items-start gap-3 text-[14px] leading-[1.6] text-encre-tenue">
          <input
            type="checkbox"
            name="consentement"
            checked={demande.consentement}
            onChange={(e) => onChange({ consentement: e.target.checked })}
            aria-invalid={erreur !== null && !demande.consentement}
            className="mt-0.5 size-6 flex-none accent-accent sm:size-5"
          />
          <span>{MARQUE.formulaire.consentement}</span>
        </label>

        {erreur && (
          <p
            role="alert"
            className="font-texte m-0 border-l-2 border-accent bg-[rgba(192,143,81,0.10)] px-[15px] py-[11px] text-[14px] text-accent-clair"
          >
            {erreur}
          </p>
        )}

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={enCours}
            className="bouton-or min-h-12 w-full cursor-pointer px-[30px] py-4 text-[15px] font-semibold tracking-[0.03em] disabled:cursor-progress disabled:opacity-70 sm:w-auto"
          >
            {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
          <button
            type="button"
            onClick={onRetour}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center text-[13.5px] text-encre-sourde underline decoration-bordure-forte underline-offset-[6px] transition-colors hover:text-accent-clair hover:decoration-accent"
          >
            Revenir à la vidéo
          </button>
        </div>

        <p className="font-texte m-0 text-[13px] leading-[1.65] text-encre-faible">
          {MARQUE.formulaire.mentionDonnees}
        </p>
      </form>
    </main>
  );
}
