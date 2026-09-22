import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARQUE } from "@/content/marque";
import { PARCOURS } from "@/content/parcours";
import { PageLivret } from "@/components/livret/page-livret";
import { Recu } from "@/components/livret/recu";
import { CLES_PARCOURS, trouverSujet } from "@/lib/tunnel/livret";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLES_PARCOURS.flatMap((parcours) =>
    PARCOURS[parcours].themes.map((t) => ({ parcours, sujet: t.cle })),
  );
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
