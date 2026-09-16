import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { MARQUE } from "@/content/marque";
import "./globals.css";

/**
 * Charte Vireel, page 06 : une seule famille pour tout le système. Archivo
 * Black porte les titres, Archivo 400/500/600 porte le reste. La substitution
 * prévue par la charte (Helvetica Neue, Arial) est déclarée dans
 * `globals.css` — jamais une police à empattements.
 */
const archivoBlack = Archivo_Black({
  variable: "--police-titre",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--police-texte",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#08090a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivoBlack.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
