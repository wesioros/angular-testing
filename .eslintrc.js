// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@angular-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    rootDir: "./src",
    project: "tsconfig.app.json",
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "unused-imports",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "prettier/prettier": ["error"],
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
