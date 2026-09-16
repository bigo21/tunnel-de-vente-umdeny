import type { Metadata, Viewport } from "next";
import { Jost, Spectral } from "next/font/google";
import { MARQUE } from "@/content/marque";
import "./globals.css";

/**
 * Charte Umdeny Capital, page 06 : Jost porte les titres, les surtitres et
 * l'interface ; Spectral prend tout le texte long. Les substitutions de la
 * charte (Century Gothic, Georgia) sont déclarées dans `globals.css`.
 */
const jost = Jost({
  variable: "--police-titre",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--police-texte",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${MARQUE.nom} — ${MARQUE.accueil.titre}`,
  description: MARQUE.accueil.intro,
  openGraph: {
    title: MARQUE.nom,
    description: MARQUE.accueil.intro,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030929",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${jost.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
