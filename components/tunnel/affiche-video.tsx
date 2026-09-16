import { IconeLecture } from "./icones";

/**
 * Le bandeau vidéo des écrans d'accueil et de sujet.
 *
 * Les films et leurs images d'accroche ne sont pas livrés : l'emplacement
 * reste donc explicitement temporaire — texture diagonale, filet en pointillé
 * et mention visible — plutôt qu'une fausse image qui laisserait croire au
 * contenu final.
 */
export function AfficheVideo({
  libelle,
  surtitre,
  onLire,
}: {
  libelle: string;
  surtitre?: string;
  onLire: () => void;
}) {
  return (
    <div className="relative max-h-[74svh] w-full overflow-hidden border-b border-bordure bg-fond-media aspect-video">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 130% at 35% 25%, var(--color-fond-carte-haut), var(--color-fond-media))",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(135deg, rgba(223,181,109,0.045) 0 1px, transparent 1px 16px)",
          }}
        />
        <div
          className="reflet-media absolute inset-y-0 w-[32%]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(223,181,109,0.10), transparent)",
          }}
        />
        <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-[10.5px] uppercase tracking-[0.22em] text-encre-sourde">
          Emplacement vidéo — image d&apos;accroche à fournir
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--voile-media)" }}
      />

      {surtitre && (
        <span className="pointer-events-none absolute left-[clamp(16px,4vw,44px)] top-[clamp(14px,3vw,26px)] text-[10.5px] uppercase tracking-[0.22em] text-encre-douce">
          {surtitre}
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-[18px] p-[clamp(16px,3vw,34px)]">
        <button
          type="button"
          onClick={onLire}
          aria-label={`Lancer la vidéo : ${libelle}`}
          className="bouton-or pointer-events-auto flex size-[clamp(58px,8vw,84px)] flex-none cursor-pointer items-center justify-center rounded-full"
          style={{ boxShadow: "var(--ombre-accent)" }}
        >
          <IconeLecture taille={28} />
        </button>
        <span className="text-[11px] uppercase tracking-[0.24em] text-accent-clair">
          {libelle}
        </span>
      </div>
    </div>
  );
}
