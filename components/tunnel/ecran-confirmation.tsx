import { MARQUE } from "@/content/marque";
import { IconeValide, IconeWhatsApp } from "./icones";

/**
 * Étape 4 : l'accusé de réception.
 *
 * Règle produit : c'est le seul endroit du tunnel où WhatsApp apparaît. Tant
 * que le numéro et le lien de chaîne ne sont pas fournis, le bloc affiche son
 * état « à renseigner » plutôt que des liens factices.
 */
export function EcranConfirmation({
  titreDemande,
  onRetourMenu,
}: {
  titreDemande: string;
  onRetourMenu: () => void;
}) {
  const { whatsapp } = MARQUE;
  const renseigne = whatsapp.conseiller !== null || whatsapp.chaine !== null;

  return (
    <main className="anim-entree flex flex-1 flex-col">
      <div
        className="flex justify-center border-b border-bordure px-[clamp(16px,4vw,48px)] py-[clamp(34px,6vw,72px)]"
        style={{ background: "var(--fond-confirmation)" }}
      >
        <div className="flex w-full max-w-[720px] flex-col items-start gap-[18px]">
          <span className="text-accent">
            <IconeValide />
          </span>
          <h1 className="titre text-balance text-[clamp(25px,4.4vw,40px)] leading-[1.06]">
            {MARQUE.confirmation.titre}
          </h1>
          <p className="max-w-[52ch] text-[clamp(14px,2vw,16px)] leading-[1.65] text-encre-douce">
            {MARQUE.confirmation.texte.replace("{demande}", titreDemande)}
          </p>
        </div>
      </div>

      <div className="flex justify-center px-[clamp(16px,4vw,48px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(26px,4vw,44px)]">
        <div className="flex w-full max-w-[720px] flex-col gap-[clamp(20px,3vw,28px)]">
          <section className="flex flex-col gap-[14px] rounded-marque border border-bordure-forte border-l-4 border-l-accent bg-fond-carte p-[clamp(18px,3vw,26px)]">
            <h2 className="titre text-[15px]">{whatsapp.titre}</h2>
            <div className="flex flex-col items-start gap-3">
              {whatsapp.conseiller ? (
                <a
                  href={whatsapp.conseiller}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton-accent inline-flex items-center gap-2.5 rounded-marque px-6 py-[14px] text-[14.5px] font-semibold no-underline"
                >
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2.5 rounded-marque border border-dashed border-encre-faible px-6 py-[14px] text-[14.5px] font-semibold text-encre-sourde">
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller} — numéro à fournir
                </span>
              )}

              {whatsapp.chaine ? (
                <a
                  href={whatsapp.chaine}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-accent pb-0.5 text-[14px] font-semibold text-accent-clair no-underline"
                >
                  {whatsapp.libelleChaine}
                </a>
              ) : (
                <span className="border-b border-dashed border-encre-faible pb-0.5 text-[14px] font-semibold text-encre-sourde">
                  {whatsapp.libelleChaine} — lien à fournir
                </span>
              )}
            </div>
            {!renseigne && (
              <p className="m-0 text-[12px] leading-[1.6] text-encre-faible">
                {whatsapp.mentionAFournir}
              </p>
            )}
          </section>

          <div className="grid gap-[clamp(16px,3vw,26px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
            {MARQUE.confirmation.suites.map((suite, index) => (
              <div key={suite} className="flex flex-col gap-1.5">
                <span className="titre text-[13px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[13.5px] leading-[1.6] text-encre-tenue">
                  {suite}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onRetourMenu}
            className="cursor-pointer self-start rounded-marque border border-encre-faible px-[22px] py-[13px] text-[14px] font-semibold transition-colors hover:border-accent hover:text-accent-clair"
          >
            Voir les autres vidéos
          </button>
        </div>
      </div>
    </main>
  );
}
