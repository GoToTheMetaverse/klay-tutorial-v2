module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    allowImportExportEverywhere: true,
    parser: "babel-eslint",
  },
  plugins: ["vue"],
  rules: {
    "no-console": "off",
  },
};
