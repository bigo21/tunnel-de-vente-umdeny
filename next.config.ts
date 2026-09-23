import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permet d'ouvrir le serveur de développement depuis un téléphone ou un
  // autre poste du réseau local. Sans cela, Next bloque ses scripts de
  // développement dès que l'adresse n'est pas `localhost` : la page s'affiche
  // alors sans JavaScript, donc sans animation ni envoi de formulaire.
  // Les trois plages privées de l'IPv4 sont couvertes, car l'adresse dépend
  // du réseau (box, partage de connexion, VPN). Sans effet en production.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
  ],
  images: {
    // Vignettes des vidéos YouTube. Rien d'autre n'est autorisé en distant.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
