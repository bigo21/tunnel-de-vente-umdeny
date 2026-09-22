"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MARQUE } from "@/content/marque";
import {
  DEMANDE_VIDE,
  envoyerDemande,
  memoire,
  verifierDemande,
  type ChampVerifie,
} from "@/lib/tunnel/envoi";
import { chemin } from "@/lib/tunnel/livret";
import type { Demande, Parcours, Theme } from "@/lib/tunnel/types";
import { IconeAlerte, IconePlus, IconeSuite } from "./icones";

type Props = {
  parcours: Parcours;
  sujet: Theme;
  objetInitial?: number;
  /**
   * Reprendre le brouillon gardé sur l'appareil. Réservé au rendu client
   * (sous la frontière Suspense de `useSearchParams`), jamais au rendu serveur.
   */
  restaurer?: boolean;
};

/** Lit l'objet choisi sur la page sujet (`?objet=2`), puis rend la fiche. */
export function FicheAvecObjet(props: Omit<Props, "objetInitial">) {
  const recherche = useSearchParams();
  const objet = Number(recherche.get("objet")) || 1;
  return <FicheDemande {...props} objetInitial={objet} restaurer />;
}

/**
 * Attend que la zone visible cesse de changer de taille (fermeture du clavier
 * virtuel), sans jamais attendre plus de 700 ms.
 */
function ecranStable(): Promise<void> {
  const vue = window.visualViewport;
  if (!vue) return Promise.resolve();
  return new Promise((fini) => {
    let calme: number;
    const limite = window.setTimeout(terminer, 700);
    function terminer() {
      window.clearTimeout(calme);
      window.clearTimeout(limite);
      vue!.removeEventListener("resize", relancer);
      fini();
    }
    function relancer() {
      window.clearTimeout(calme);
      calme = window.setTimeout(terminer, 160);
    }
    vue.addEventListener("resize", relancer);
    relancer();
  });
}

const ORDRE: ChampVerifie[] = [
  "nom",
  "telephone",
  "qualification",
  "email",
  "consentement",
];

/**
 * La fiche de demande : la seule page claire du livret, parce que c'est la
 * seule où le visiteur écrit.
 *
 * Quatre réponses obligatoires (nom, téléphone, qualification, consentement),
 * trois facultatives repliées. Les erreurs apparaissent sous chaque champ,
 * après la sortie du champ ou à l'envoi ; à l'envoi, un résumé reçoit le focus
 * et renvoie à chaque champ. Les réponses sont gardées sur l'appareil tant que
 * la demande n'est pas partie, pour survivre à une connexion qui lâche.
 */
export function FicheDemande({
  parcours,
  sujet,
  objetInitial = 1,
  restaurer = false,
}: Props) {
  const router = useRouter();
  const id = useId();
  const { demande: textes } = MARQUE;
  const objets = sujet.formulaires;
  const [objet, setObjet] = useState(
    Math.min(Math.max(objetInitial, 1), objets.length),
  );
  const [demande, setDemande] = useState<Demande>(() => {
    const brouillon = restaurer ? memoire.lireBrouillon(sujet.cle) : null;
    // Le consentement se redonne à chaque fois : il ne se présume pas.
    return brouillon
      ? { ...DEMANDE_VIDE, ...brouillon, consentement: false }
      : DEMANDE_VIDE;
  });
  const [touches, setTouches] = useState<Partial<Record<ChampVerifie, true>>>(
    {},
  );
  const [soumise, setSoumise] = useState(false);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "echec">("saisie");
  const resume = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (restaurer) memoire.ecrireBrouillon(sujet.cle, demande);
  }, [demande, sujet.cle, restaurer]);

  const erreurs = verifierDemande(demande);
  const visible = (champ: ChampVerifie) =>
    (soumise || touches[champ]) && erreurs[champ]
      ? textes.erreurs[erreurs[champ]!]
      : null;

  const changer = (partiel: Partial<Demande>) =>
    setDemande((d) => ({ ...d, ...partiel }));
  const toucher = (champ: ChampVerifie) =>
    setTouches((t) => (t[champ] ? t : { ...t, [champ]: true }));

  const idChamp = (champ: string) => `${id}-${champ}`;

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (etat === "envoi") return;
    setSoumise(true);
    if (Object.keys(erreurs).length > 0) {
      requestAnimationFrame(() => resume.current?.focus());
      return;
    }
    setEtat("envoi");
    try {
      await envoyerDemande(demande, {
        parcours: parcours.cle,
        theme: sujet.cle,
        formulaire: objets[objet - 1],
      });
      memoire.ecrireRecu({
        nom: demande.nom.trim(),
        telephone: demande.telephone.trim(),
        objet: objets[objet - 1],
        parcours: parcours.cle,
        sujet: sujet.cle,
      });
      memoire.effacerBrouillon();
      // Sur téléphone, le clavier est encore ouvert : il se referme, la
      // hauteur de l'écran change, et le navigateur annulerait la transition
      // vers le reçu. On le ferme d'abord et on attend que l'écran se pose.
      (document.activeElement as HTMLElement | null)?.blur();
      await ecranStable();
      router.replace(chemin.recu(parcours.cle, sujet.cle), {
        transitionTypes: ["page-avant"],
      });
    } catch {
      setEtat("echec");
    }
  }

  const erreursListees = ORDRE.filter((c) => erreurs[c]);

  return (
    <form
      noValidate
      onSubmit={soumettre}
      aria-describedby={`${id}-donnees`}
      className="page-claire bg-papier px-5 pt-7 pb-8 text-papier-encre shadow-(--ombre-feuille) sm:px-8 sm:pt-9 livret:px-10 livret:pb-10"
    >
      {soumise && erreursListees.length > 0 && (
        <div
          ref={resume}
          tabIndex={-1}
          role="alert"
          className="mb-7 border-t-2 border-alerte-papier pt-4 outline-none"
        >
          <p className="flex items-center gap-2 font-titre text-[0.9375rem] font-medium text-alerte-papier">
            <IconeAlerte className="size-5 shrink-0" />
            {textes.erreurs.resume}
          </p>
          <ul className="mt-2 space-y-1 pl-7">
            {erreursListees.map((champ) => (
              <li key={champ}>
                <a
                  href={`#${idChamp(champ)}`}
                  onClick={(e) => {
                    const cible = document.getElementById(idChamp(champ));
                    if (!cible) return;
                    e.preventDefault();
                    // Un groupe de réponses reçoit le focus sur sa première case.
                    const saisie =
                      cible.querySelector<HTMLElement>("input") ?? cible;
                    saisie.focus();
                    saisie.scrollIntoView({ block: "center" });
                  }}
                  className="text-mention text-papier-encre underline decoration-papier-filet underline-offset-4"
                >
                  {textes.erreurs[erreurs[champ]!]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Objet de la demande */}
      {objets.length > 1 ? (
        <fieldset>
          <legend className="font-titre text-[0.9375rem] font-medium text-papier-encre">
            {textes.objet}
          </legend>
          <div className="mt-2">
            {objets.map((libelle, i) => (
              <Choix
                key={libelle}
                name={`${id}-objet`}
                checked={objet === i + 1}
                onChange={() => setObjet(i + 1)}
              >
                {libelle}
              </Choix>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="font-titre text-[0.9375rem] text-papier-encre-douce">
          {textes.objet} :{" "}
          <span className="font-medium text-papier-encre">{objets[0]}</span>
        </p>
      )}

      <div className="mt-7 space-y-6">
        <Champ
          id={idChamp("nom")}
          libelle={textes.nom}
          obligatoire
          erreur={visible("nom")}
        >
          <input
            type="text"
            name="nom"
            autoComplete="name"
            autoCapitalize="words"
            required
            value={demande.nom}
            onChange={(e) => changer({ nom: e.target.value })}
            onBlur={() => demande.nom && toucher("nom")}
          />
        </Champ>

        <Champ
          id={idChamp("telephone")}
          libelle={textes.telephone}
          aide={textes.aideTelephone}
          obligatoire
          erreur={visible("telephone")}
        >
          <input
            type="tel"
            name="telephone"
            inputMode="tel"
            autoComplete="tel"
            required
            value={demande.telephone}
            onChange={(e) => changer({ telephone: e.target.value })}
            onBlur={() => demande.telephone && toucher("telephone")}
          />
        </Champ>

        <fieldset
          id={idChamp("qualification")}
          tabIndex={-1}
          aria-describedby={
            visible("qualification") ? `${idChamp("qualification")}-erreur` : undefined
          }
          className="outline-none"
        >
          <legend className="font-titre text-[0.9375rem] font-medium text-papier-encre">
            {parcours.questionQualification}
            <span className="sr-only"> ({textes.obligatoire})</span>
          </legend>
          <div className="mt-2">
            {parcours.optionsQualification.map((option) => (
              <Choix
                key={option}
                name="qualification"
                checked={demande.qualification === option}
                onChange={() => changer({ qualification: option })}
              >
                {option}
              </Choix>
            ))}
          </div>
          <Erreur id={`${idChamp("qualification")}-erreur`} texte={visible("qualification")} />
        </fieldset>

        <details className="group border-t border-papier-reglure pt-1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-titre text-[0.9375rem] text-papier-encre-douce [&::-webkit-details-marker]:hidden">
            {textes.facultatif}
            <IconePlus className="size-5 shrink-0 text-papier-encre-sourde transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="space-y-6 pt-3 pb-2">
            <Champ
              id={idChamp("email")}
              libelle={textes.email}
              aide={textes.aideEmail}
              erreur={visible("email")}
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={demande.email}
                onChange={(e) => changer({ email: e.target.value })}
                onBlur={() => toucher("email")}
              />
            </Champ>
            <Champ id={idChamp("ville")} libelle={textes.ville}>
              <input
                type="text"
                name="ville"
                autoComplete="address-level2"
                value={demande.ville}
                onChange={(e) => changer({ ville: e.target.value })}
              />
            </Champ>
            <Champ id={idChamp("echeance")} libelle={textes.echeance}>
              <select
                name="echeance"
                value={demande.echeance}
                onChange={(e) => changer({ echeance: e.target.value })}
              >
                <option value="">—</option>
                {textes.echeances.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </Champ>
          </div>
        </details>

        <div className="border-t border-papier-reglure pt-5">
          <label
            htmlFor={idChamp("consentement")}
            className="flex cursor-pointer gap-3.5"
          >
            <input
              id={idChamp("consentement")}
              type="checkbox"
              required
              checked={demande.consentement}
              onChange={(e) => {
                changer({ consentement: e.target.checked });
                toucher("consentement");
              }}
              aria-invalid={visible("consentement") ? true : undefined}
              aria-describedby={
                visible("consentement")
                  ? `${idChamp("consentement")}-erreur`
                  : undefined
              }
              className="case mt-0.5"
            />
            <span className="text-[0.9375rem] leading-snug text-papier-encre">
              {textes.consentement}
              <span className="sr-only"> ({textes.obligatoire})</span>
            </span>
          </label>
          <Erreur
            id={`${idChamp("consentement")}-erreur`}
            texte={visible("consentement")}
            className="pl-9"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={etat === "envoi"}
        aria-disabled={etat === "envoi"}
        className="bouton-or mt-8 flex min-h-14 w-full items-center justify-between gap-4 px-6 font-titre text-base font-medium disabled:cursor-progress disabled:opacity-70"
      >
        {etat === "envoi" ? textes.envoi : textes.envoyer}
        <IconeSuite className="size-5 shrink-0" />
      </button>

      <p role="status" className="min-h-0 empty:hidden">
        {etat === "echec" ? (
          <span className="mt-4 flex gap-2 text-[0.9375rem] text-alerte-papier">
            <IconeAlerte className="mt-0.5 size-5 shrink-0" />
            {textes.erreurs.envoi}
          </span>
        ) : null}
      </p>

      <p
        id={`${id}-donnees`}
        className="mt-5 text-mention text-papier-encre-douce"
      >
        {textes.mentionDonnees}
      </p>
      <p className="mt-2 text-mention text-papier-encre-sourde">
        {textes.brouillon}
      </p>
    </form>
  );
}

/** Un champ sur sa réglure : libellé, aide, saisie soulignée, erreur. */
function Champ({
  id,
  libelle,
  aide,
  obligatoire = false,
  erreur,
  children,
}: {
  id: string;
  libelle: string;
  aide?: string;
  obligatoire?: boolean;
  erreur?: string | null;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  const decrit = [aide && `${id}-aide`, erreur && `${id}-erreur`]
    .filter(Boolean)
    .join(" ");
  const saisie = {
    ...children.props,
    id,
    "aria-invalid": erreur ? true : undefined,
    "aria-describedby": decrit || undefined,
    className:
      "saisie mt-1.5 block h-12 w-full border-0 border-b bg-papier-releve px-3 font-titre text-[1.0625rem] text-papier-encre outline-none transition-colors",
  };
  const Element = children.type as "input";
  return (
    <div>
      <label
        htmlFor={id}
        className="font-titre text-[0.9375rem] font-medium text-papier-encre"
      >
        {libelle}
        {obligatoire && <span className="sr-only"> ({MARQUE.demande.obligatoire})</span>}
      </label>
      <Element {...saisie} />
      {aide && (
        <p id={`${id}-aide`} className="mt-1.5 text-mention text-papier-encre-sourde">
          {aide}
        </p>
      )}
      <Erreur id={`${id}-erreur`} texte={erreur} />
    </div>
  );
}

function Erreur({
  id,
  texte,
  className = "",
}: {
  id: string;
  texte?: string | null;
  className?: string;
}) {
  if (!texte) return null;
  return (
    <p
      id={id}
      className={`mt-2 flex gap-2 text-mention text-alerte-papier ${className}`}
    >
      <IconeAlerte className="mt-px size-4 shrink-0" />
      {texte}
    </p>
  );
}

/** Une réponse à cocher, pleine ligne, sur la réglure de la fiche. */
function Choix({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-3.5 border-b border-papier-reglure py-2.5 text-[0.9375rem] leading-snug text-papier-encre transition-colors hover:bg-papier-releve">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="pastille"
      />
      {children}
    </label>
  );
}
