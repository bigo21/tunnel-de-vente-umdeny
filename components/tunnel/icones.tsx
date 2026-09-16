/** Icônes du tunnel, reprises telles quelles de la maquette. */

export function IconeLecture({ taille = 24 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5l12 7-12 7z" />
    </svg>
  );
}

export function IconeEcran({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M4 4h16v13H4z" />
      <path d="M10 8l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
      <path d="M8 21h8" />
    </svg>
  );
}

export function IconeWhatsApp({ taille = 20 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M3.5 20.5l1.4-4.2A8.4 8.4 0 1 1 8 19.9z" />
      <path
        d="M8.8 9.2c0 3 2.2 5.2 5.2 5.2l1.2-1.6-2-.9-.9 1a5 5 0 0 1-2-2l1-.9-.9-2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
