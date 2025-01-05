import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
    },
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Si usas React 17 o superior, no es necesario importar React
      "react/jsx-no-target-blank": ["error", { "allowReferrer": true }], // Configura la regla para permitir rel="noreferrer"
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,
];