import type { SVGProps } from "react";

/**
 * Pictogrammes du livret, dessinés sur une grille de 24 et un trait de 1,5.
 * Toujours décoratifs : le texte voisin porte le sens.
 */
function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function IconeLecture(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M8.5 5.8v12.4a.6.6 0 0 0 .9.5l9.7-6.2a.6.6 0 0 0 0-1L9.4 5.3a.6.6 0 0 0-.9.5Z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function IconeSuite(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" />
    </Base>
  );
}

export function IconeRetour(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M20 12H4.5M10 6.5 4.5 12l5.5 5.5" />
    </Base>
  );
}

export function IconeFermer(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}

export function IconePlus(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function IconeCoche(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M5 12.5 10 17.5 19.5 7" strokeWidth={2} />
    </Base>
  );
}

export function IconeAlerte(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.4v.1" strokeWidth={2} />
    </Base>
  );
}

export function IconeMessage(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
    </Base>
  );
}
