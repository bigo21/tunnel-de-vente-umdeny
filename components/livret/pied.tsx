import Image from "next/image";
import { MARQUE } from "@/content/marque";

/** Dernière page du livret : le symbole, le groupe et la mention de principe. */
export function Pied() {
  return (
    <footer className="mt-auto border-t border-reglure px-(--gouttiere) pt-10 pb-12 livret:pl-(--reliure)">
      <div className="grid gap-6 livret:grid-cols-[auto_minmax(0,1fr)] livret:items-start livret:gap-10">
        <Image
          src={MARQUE.symbole.src}
          width={MARQUE.symbole.largeur}
          height={MARQUE.symbole.hauteur}
          alt=""
          sizes="48px"
          className="h-9 w-auto opacity-80"
        />
        <div className="max-w-[62ch] space-y-2">
          <p className="font-titre text-mention text-encre-douce">
            {MARQUE.piedDePage.groupe}
          </p>
          <p className="text-mention text-encre-sourde">
            {MARQUE.piedDePage.mention}
          </p>
        </div>
      </div>
    </footer>
  );
}
