"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { AnimatePresence, LayoutGroup, motion, MotionConfig } from "motion/react";
import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { DEMANDE_VIDE, demandeComplete, envoyerDemande } from "@/lib/tunnel/envoi";
import type { Vue } from "@/lib/tunnel/etapes";
import { ECRAN, type Sens } from "@/lib/tunnel/mouvement";
import type { CleParcours, Demande, Theme } from "@/lib/tunnel/types";
import type { Video } from "@/lib/tunnel/video";
import { EcranAccueil } from "./ecran-accueil";
import { EcranConfirmation } from "./ecran-confirmation";
import { EcranFormulaire } from "./ecran-formulaire";
import { EcranMenu } from "./ecran-menu";
import { EcranTheme } from "./ecran-theme";
import { EnTete } from "./en-tete";
import { LecteurVideo } from "./lecteur-video";
import { PiedDePage } from "./pied-de-page";

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
 *
 * `AnimatePresence` en mode « wait » laisse l'écran sortant finir avant de
 * monter le suivant ; `sens` décide de la direction du glissement. Le
 * `LayoutGroup` permet à la vignette du menu et au bandeau du sujet de se
 * reconnaître : le même objet grandit d'un écran à l'autre.
 */
export function Tunnel() {
  const [etat, setEtat] = useState<EtatTunnel>(DEPART);
  const [sens, setSens] = useState<Sens>("avant");
  const [demande, setDemande] = useState<Demande>(DEMANDE_VIDE);
  const [erreur, setErreur] = useState<string | null>(null);
  const [lecture, setLecture] = useState<{ video: Video; titre: string } | null>(
    null,
  );
  const [enCours, demarrerEnvoi] = useTransition();

  const parcours = etat.parcours ? PARCOURS[etat.parcours] : null;

  // Chaque écran est une page à part entière pour le visiteur : on le ramène
  // en haut plutôt que de le laisser au milieu du précédent.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [etat.vue, etat.theme]);

  // Le lecteur prend tout l'écran : on bloque le défilement derrière.
  useEffect(() => {
    if (!lecture) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [lecture]);

  const fermerLecteur = useCallback(() => setLecture(null), []);

  const avancer = useCallback((changement: (etat: EtatTunnel) => EtatTunnel) => {
    setSens("avant");
    setEtat(changement);
  }, []);

  const revenir = useCallback(() => {
    setSens("arriere");
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
    setSens("arriere");
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
      setSens("avant");
      setEtat((precedent) => ({ ...precedent, vue: "confirmation" }));
      setDemande(DEMANDE_VIDE);
    });
  }, [demande, etat]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-svh min-w-0 flex-col overflow-x-clip">
        <EnTete vue={etat.vue} onRetour={revenir} />

        <LayoutGroup>
          {/* `initial={false}` : le premier écran est déjà là au chargement,
              il n'a rien à traverser. */}
          <AnimatePresence mode="wait" custom={sens} initial={false}>
            <motion.div
              key={etat.vue}
              custom={sens}
              variants={ECRAN}
              initial="entrant"
              animate="present"
              exit="sortant"
              className="flex flex-1 flex-col"
            >
              {etat.vue === "accueil" && (
                <EcranAccueil
                  onLire={() =>
                    setLecture({
                      video: MARQUE.accueil.video,
                      titre: MARQUE.accueil.libelleVideo,
                    })
                  }
                  onChoisirParcours={(cle) =>
                    avancer(() => ({
                      vue: "menu",
                      parcours: cle,
                      theme: null,
                      formulaire: null,
                    }))
                  }
                />
              )}

              {etat.vue === "menu" && parcours && (
                <EcranMenu
                  parcours={parcours}
                  onChoisirTheme={(theme) =>
                    avancer((precedent) => ({
                      ...precedent,
                      vue: "theme",
                      theme,
                    }))
                  }
                />
              )}

              {etat.vue === "theme" && parcours && etat.theme && (
                <EcranTheme
                  parcours={parcours}
                  theme={etat.theme}
                  onLire={(theme) =>
                    setLecture({ video: theme.video, titre: theme.titre })
                  }
                  onOuvrirFormulaire={(libelle) => {
                    setErreur(null);
                    avancer((precedent) => ({
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
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        <PiedDePage />

        <AnimatePresence>
          {lecture && (
            <LecteurVideo
              video={lecture.video}
              titre={lecture.titre}
              onFermer={fermerLecteur}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
