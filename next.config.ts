import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permet d'ouvrir le serveur de développement depuis un téléphone ou un
  // autre poste du réseau local (http://192.168.x.x:3000). Sans cela, Next
  // bloque ses scripts de développement : la page s'affiche sans JavaScript.
  // Sans effet en production.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // Vignettes des vidéos YouTube. Rien d'autre n'est autorisé en distant.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
