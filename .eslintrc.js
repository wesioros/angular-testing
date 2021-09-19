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
    "sourceType": "module"
  },
    plugins: [
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "unused-imports",
    "html"
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
