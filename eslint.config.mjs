import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Maquettes Claude Design : du HTML/JS généré, hors périmètre du lint.
    "mockup_Tunnel_Umdeny/**",
  ]),
  {
    rules: {
      // Les paramètres préfixés d'un `_` marquent une signature volontairement
      // plus large que son implémentation actuelle (cf. `lib/tunnel/envoi.ts`).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
