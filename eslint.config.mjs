import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/", "coverage/"] },
  ...tseslint.configs.recommended,
];
