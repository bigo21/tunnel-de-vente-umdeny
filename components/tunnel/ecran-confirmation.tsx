"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CASCADE, CASCADE_ENFANT, RESSORT_VIF } from "@/lib/tunnel/mouvement";
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
    <main className="flex flex-1 flex-col">
      <div
        className="flex justify-center border-b border-bordure px-4 py-10 sm:px-[clamp(16px,4vw,52px)] sm:py-[clamp(36px,6vw,80px)]"
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

      <div className="flex justify-center px-4 pb-12 pt-7 sm:px-[clamp(16px,4vw,52px)] sm:pb-[clamp(40px,6vw,72px)] sm:pt-[clamp(28px,4vw,48px)]">
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
                  className="bouton-or inline-flex min-h-12 w-full items-center justify-center gap-2.5 px-[26px] py-[15px] text-[14.5px] font-semibold tracking-[0.03em] no-underline sm:w-auto"
                >
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller}
                </a>
              ) : (
                <span className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-dashed border-bordure-forte px-[26px] py-[15px] text-center text-[13.5px] font-medium tracking-[0.03em] text-encre-sourde sm:w-auto sm:text-[14.5px]">
                  <IconeWhatsApp />
                  {whatsapp.libelleConseiller} — numéro à fournir
                </span>
              )}

              {whatsapp.chaine ? (
                <a
                  href={whatsapp.chaine}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center border-b border-accent text-[14px] font-medium text-accent-clair no-underline"
                >
                  {whatsapp.libelleChaine}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center border-b border-dashed border-bordure-forte text-[13.5px] font-medium text-encre-sourde sm:text-[14px]">
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

          <motion.div
            variants={CASCADE}
            initial="entrant"
            animate="present"
            className="grid gap-[clamp(18px,3vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))]"
          >
            {MARQUE.confirmation.suites.map((suite, index) => (
              <motion.div
                key={suite}
                variants={CASCADE_ENFANT}
                className="flex flex-col gap-[7px]"
              >
                <span className="text-[24px] font-light text-accent-clair">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-texte text-[14px] leading-[1.65] text-encre-tenue">
                  {suite}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            onClick={onRetourMenu}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={RESSORT_VIF}
            className="min-h-12 w-full cursor-pointer border border-bordure-forte px-6 py-[14px] text-center text-[14px] font-medium tracking-[0.03em] sm:w-auto sm:self-start transition-[color,border-color,background-color] duration-200 hover:border-accent hover:bg-[rgba(192,143,81,0.08)] hover:text-accent-clair"
          >
            Voir les autres vidéos
          </motion.button>
        </div>
      </div>
    </main>
  );
}
