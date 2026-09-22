import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARQUE } from "@/content/marque";
import { PageLivret } from "@/components/livret/page-livret";
import { Recu } from "@/components/livret/recu";
import { sujetsAvecFiche, trouverSujet } from "@/lib/tunnel/livret";

export const dynamicParams = false;

/** Seuls les sujets dont un formulaire est rempli sur le tunnel ont ces pages. */
export function generateStaticParams() {
  return sujetsAvecFiche();
}

export const metadata: Metadata = {
  title: MARQUE.recu.tampon,
  robots: { index: false },
};

/** Le reçu, après envoi. Seul écran où WhatsApp apparaît. */
export default async function PageRecu({
  params,
}: PageProps<"/[parcours]/[sujet]/demande/envoyee">) {
  const { parcours: cleParcours, sujet: cleSujet } = await params;
  const trouve = trouverSujet(cleParcours, cleSujet);
  if (!trouve) notFound();

  return (
    <PageLivret>
      <div className="px-(--gouttiere) pt-10 pb-24 livret:pt-16 livret:pb-32 livret:pl-(--reliure)">
        <Recu parcours={trouve.parcours} sujet={trouve.sujet} />
      </div>
    </PageLivret>
  );
}
