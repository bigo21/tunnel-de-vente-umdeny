import type { Metadata } from "next";
import { Diagnostic } from "@/components/livret/diagnostic";

export const metadata: Metadata = {
  title: "Diagnostic",
  robots: { index: false, follow: false },
};

/**
 * Page de test, à ouvrir depuis l'appareil qui pose problème.
 *
 * Elle dit pourquoi le mouvement ne se joue pas : réglage système, script qui
 * n'a pas démarré, navigateur sans transitions de page. À retirer une fois la
 * recette terminée.
 */
export default function PageDiagnostic() {
  return (
    <main
      id="contenu"
      className="flex-1 px-(--gouttiere) pt-(--hauteur-entete) pb-24 livret:pl-(--reliure)"
    >
      <Diagnostic />
    </main>
  );
}
