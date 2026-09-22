import type { Metadata, Viewport } from "next";
import { Jost, Spectral } from "next/font/google";
import { MARQUE } from "@/content/marque";
import { Entete } from "@/components/livret/entete";
import { FilDeReliure } from "@/components/livret/fil-de-reliure";
import { Lissage } from "@/components/livret/lissage";
import { Pied } from "@/components/livret/pied";
import "./globals.css";

/**
 * Charte : Jost porte les titres et l'interface, Spectral le texte courant.
 * Jost est chargée en variable (une seule requête pour toutes les graisses) ;
 * Spectral en deux graisses seulement, les seules employées.
 */
const jost = Jost({
  variable: "--police-titre",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--police-texte",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: MARQUE.meta.titre, template: `%s — ${MARQUE.nom}` },
  description: MARQUE.meta.description,
  openGraph: {
    title: MARQUE.meta.titre,
    description: MARQUE.meta.description,
    siteName: MARQUE.nom,
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: MARQUE.couleurNavigateur,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${jost.variable} ${spectral.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Arme les entrées de page avant la première image : sans ce script,
            le contenu s'afficherait, disparaîtrait puis s'animerait. Si
            l'application n'a pas démarré après 2,5 s (réseau lent, script
            bloqué), il lève le masquage : rien ne reste jamais invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var r=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;r.classList.add('js-mouvement');setTimeout(function(){if(!r.classList.contains('js-pret'))r.classList.remove('js-mouvement')},2500)})()",
          }}
        />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-(--z-evitement) -translate-y-24 bg-or px-4 py-3 font-titre text-mention font-medium text-sur-or transition-transform focus:translate-y-0"
        >
          {MARQUE.interface.evitement}
        </a>
        <Lissage />
        <Entete />
        <FilDeReliure />
        {children}
        <Pied />
      </body>
    </html>
  );
}
