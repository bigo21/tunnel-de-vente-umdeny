import Image from "next/image";
import { MARQUE } from "@/content/marque";
import { IconeWhatsApp } from "./icones";

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
        className="flex justify-center border-b border-bordure px-[clamp(16px,4vw,52px)] py-[clamp(36px,6vw,80px)]"
        style={{
          background:
            "radial-gradient(110% 130% at 20% 0%, #1a2050 0%, var(--color-fond-carte-haut) 45%, var(--color-fond) 100%)",
        }}
      >
        <div className="flex w-full max-w-[760px] flex-col items-start gap-5">
          <Image
            src={MARQUE.symbole.src}
            alt=""
            width={MARQUE.symbole.largeur}
            height={MARQUE.symbole.hauteur}
            className="h-[clamp(44px,7vw,62px)] w-auto"
          />
          <h1 className="text-balance text-[clamp(26px,4.8vw,46px)] font-light leading-[1.04]">
            {MARQUE.confirmation.titre}
          </h1>
          <p className="font-texte max-w-[52ch] text-[clamp(15px,2.1vw,18px)] leading-[1.7] text-encre-douce">
            {MARQUE.confirmation.texte.replace("{demande}", titreDemande)}
          </p>
        </div>
      </div>

      <div className="flex justify-center px-[clamp(16px,4vw,52px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(28px,4vw,48px)]">
        <div className="flex w-full max-w-[760px] flex-col gap-[clamp(22px,3vw,32px)]">
          <section className="flex flex-col gap-4 border border-bordure-forte bg-fond-carte p-[clamp(20px,3vw,28px)]">
            <h2 className="text-[10.5px] uppercase tracking-[0.24em] text-accent">
              Continuer sur WhatsApp
            </h2>
            <div className="flex flex-col items-start gap-[14px]">
              {whatsapp.conseiller ? (
                <a
                  href={whatsapp.conseiller}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton-or inline-flex items-center gap-2.5 px-[26px] py-[15px] text-[14.5px] font-semibold tracking-[0.03em] no-underline"
                >
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2.5 border border-dashed border-bordure-forte px-[26px] py-[15px] text-[14.5px] font-medium tracking-[0.03em] text-encre-sourde">
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller} — numéro à fournir
                </span>
              )}

              {whatsapp.chaine ? (
                <a
                  href={whatsapp.chaine}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-accent pb-0.5 text-[14px] font-medium text-accent-clair no-underline"
                >
                  {whatsapp.libelleChaine}
                </a>
              ) : (
                <span className="border-b border-dashed border-bordure-forte pb-0.5 text-[14px] font-medium text-encre-sourde">
                  {whatsapp.libelleChaine} — lien à fournir
                </span>
              )}
            </div>
            {!renseigne && (
              <p className="font-texte m-0 text-[13px] leading-[1.65] text-encre-faible">
                {whatsapp.mentionAFournir}
              </p>
            )}
          </section>

          <div className="grid gap-[clamp(18px,3vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))]">
            {MARQUE.confirmation.suites.map((suite, index) => (
              <div key={suite} className="flex flex-col gap-[7px]">
                <span className="text-[24px] font-light text-accent-clair">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-texte text-[14px] leading-[1.65] text-encre-tenue">
                  {suite}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onRetourMenu}
            className="cursor-pointer self-start border border-bordure-forte px-6 py-[14px] text-[14px] font-medium tracking-[0.03em] transition-colors hover:border-accent hover:text-accent-clair"
          >
            Voir les autres vidéos
          </button>
        </div>
      </div>
    </main>
  );
}
