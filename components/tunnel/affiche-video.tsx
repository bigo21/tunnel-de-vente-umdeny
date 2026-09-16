import { IconeLecture } from "./icones";

/**
 * Le bandeau vidéo des écrans d'accueil et de sujet.
 *
 * Les vidéos et leurs images d'accroche ne sont pas livrées : l'emplacement
 * reste donc explicitement temporaire — texture diagonale et mention visible —
 * plutôt qu'une fausse image qui laisserait croire au contenu final.
 *
 * Vireel centre le bouton de lecture et pose son repère dans un angle, sans
 * voile dégradé : le fond radial suffit à détacher l'action.
 */
export function AfficheVideo({
  libelle,
  repere,
  positionRepere = "haut",
  hauteurMax = "70svh",
  teinteRepere = "text-encre-faible",
  onLire,
}: {
  libelle: string;
  repere?: string;
  positionRepere?: "haut" | "bas";
  hauteurMax?: string;
  teinteRepere?: string;
  onLire: () => void;
}) {
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-bordure"
      style={{ background: "var(--fond-media)", maxHeight: hauteurMax }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "var(--texture-media)" }}
      />
      <div
        className="reflet-media absolute inset-y-0 left-0 w-[35%]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(221,99,22,0.10), transparent)",
        }}
      />

      <div className="relative flex flex-col items-center gap-4 p-5 text-center">
        <button
          type="button"
          onClick={onLire}
          aria-label={`Lancer la vidéo : ${libelle}`}
          className="bouton-accent flex size-[clamp(64px,11vw,92px)] cursor-pointer items-center justify-center rounded-full"
          style={{ boxShadow: "var(--ombre-accent)" }}
        >
          <IconeLecture taille={30} />
        </button>
        <span className="text-[12px] uppercase tracking-[0.18em] text-encre-sourde">
          {libelle}
        </span>
      </div>

      {repere && (
        <span
          className={`absolute left-[clamp(16px,4vw,40px)] ${
            positionRepere === "bas"
              ? "bottom-[clamp(14px,3vw,26px)]"
              : "top-[clamp(14px,3vw,24px)]"
          } surtitre ${teinteRepere}`}
        >
          {repere}
        </span>
      )}
    </div>
  );
}
