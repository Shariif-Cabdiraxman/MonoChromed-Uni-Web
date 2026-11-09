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
    // Static export published into the htdocs folder by `npm run deploy`.
    "_next/**",
    "_not-found/**",
    "index.html",
    "index.txt",
    "404.html",
    "__next.*.txt",
  ]),
]);

export default eslintConfig;
