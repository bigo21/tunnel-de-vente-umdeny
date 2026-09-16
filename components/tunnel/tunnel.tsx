"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { DEMANDE_VIDE, demandeComplete, envoyerDemande } from "@/lib/tunnel/envoi";
import type { Vue } from "@/lib/tunnel/etapes";
import type { CleParcours, Demande, Theme } from "@/lib/tunnel/types";
import { EcranAccueil } from "./ecran-accueil";
import { EcranConfirmation } from "./ecran-confirmation";
import { EcranFormulaire } from "./ecran-formulaire";
import { EcranMenu } from "./ecran-menu";
import { EcranTheme } from "./ecran-theme";
import { EnTete } from "./en-tete";
import { LecteurVideo } from "./lecteur-video";

type EtatTunnel = {
  vue: Vue;
  parcours: CleParcours | null;
  theme: Theme | null;
  formulaire: string | null;
};

const DEPART: EtatTunnel = {
  vue: "accueil",
  parcours: null,
  theme: null,
  formulaire: null,
};

/**
 * Le tunnel entier tient dans une page qui se déploie écran par écran : pas de
 * navigation multi-pages, conformément au brief. L'état vit donc ici.
 */
export function Tunnel() {
  const [etat, setEtat] = useState<EtatTunnel>(DEPART);
  const [demande, setDemande] = useState<Demande>(DEMANDE_VIDE);
  const [erreur, setErreur] = useState<string | null>(null);
  const [lecteurOuvert, setLecteurOuvert] = useState(false);
  const [enCours, demarrerEnvoi] = useTransition();

  const parcours = etat.parcours ? PARCOURS[etat.parcours] : null;

  // Chaque écran est une page à part entière pour le visiteur : on le ramène
  // en haut plutôt que de le laisser au milieu du précédent.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [etat.vue, etat.theme]);

  // Le lecteur prend tout l'écran : on bloque le défilement derrière.
  useEffect(() => {
    if (!lecteurOuvert) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [lecteurOuvert]);

  const fermerLecteur = useCallback(() => setLecteurOuvert(false), []);

  const revenir = useCallback(() => {
    setErreur(null);
    setEtat((precedent) => {
      switch (precedent.vue) {
        case "menu":
          return DEPART;
        case "theme":
          return { ...precedent, vue: "menu", theme: null };
        case "formulaire":
          return { ...precedent, vue: "theme" };
        case "confirmation":
          return { ...precedent, vue: "menu", theme: null, formulaire: null };
        default:
          return precedent;
      }
    });
  }, []);

  const retourMenu = useCallback(() => {
    setEtat((precedent) => ({
      ...precedent,
      vue: "menu",
      theme: null,
      formulaire: null,
    }));
  }, []);

  const envoyer = useCallback(() => {
    if (!demandeComplete(demande)) {
      setErreur(MARQUE.formulaire.erreur);
      return;
    }

    const { parcours: cleParcours, theme, formulaire } = etat;
    if (!cleParcours || !theme || !formulaire) return;

    setErreur(null);
    demarrerEnvoi(async () => {
      await envoyerDemande(demande, {
        parcours: cleParcours,
        theme: theme.cle,
        formulaire,
      });
      setEtat((precedent) => ({ ...precedent, vue: "confirmation" }));
      setDemande(DEMANDE_VIDE);
    });
  }, [demande, etat]);

  return (
    <div className="flex min-h-svh min-w-0 flex-col">
      <EnTete vue={etat.vue} onRetour={revenir} />

      {etat.vue === "accueil" && (
        <EcranAccueil
          onLire={() => setLecteurOuvert(true)}
          onChoisirParcours={(cle) =>
            setEtat({ vue: "menu", parcours: cle, theme: null, formulaire: null })
          }
        />
      )}

      {etat.vue === "menu" && parcours && (
        <EcranMenu
          parcours={parcours}
          onChoisirTheme={(theme) =>
            setEtat((precedent) => ({ ...precedent, vue: "theme", theme }))
          }
        />
      )}

      {etat.vue === "theme" && parcours && etat.theme && (
        <EcranTheme
          parcours={parcours}
          theme={etat.theme}
          onLire={() => setLecteurOuvert(true)}
          onOuvrirFormulaire={(libelle) => {
            setErreur(null);
            setEtat((precedent) => ({
              ...precedent,
              vue: "formulaire",
              formulaire: libelle,
            }));
          }}
          onRetourMenu={retourMenu}
        />
      )}

      {etat.vue === "formulaire" && parcours && etat.formulaire && (
        <EcranFormulaire
          parcours={parcours}
          titre={etat.formulaire}
          demande={demande}
          onChange={(modification) =>
            setDemande((precedent) => ({ ...precedent, ...modification }))
          }
          onEnvoyer={envoyer}
          onRetour={revenir}
          erreur={erreur}
          enCours={enCours}
        />
      )}

      {etat.vue === "confirmation" && etat.formulaire && (
        <EcranConfirmation
          titreDemande={etat.formulaire}
          onRetourMenu={retourMenu}
        />
      )}

      {lecteurOuvert && <LecteurVideo onFermer={fermerLecteur} />}
    </div>
  );
}
