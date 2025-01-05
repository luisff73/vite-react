import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: pluginReact,
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
  pluginReact.configs.flat.recommended,
];