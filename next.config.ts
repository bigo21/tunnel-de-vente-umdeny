import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vignettes des vidéos YouTube. Rien d'autre n'est autorisé en distant.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
