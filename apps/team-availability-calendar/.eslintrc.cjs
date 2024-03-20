module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-typescript",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-tabs": ["error", {allowIndentationTabs: true}],
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "vue/require-v-for-key": "error",
    "vue/no-unused-vars": "error",
    "vue/no-mutating-props": "off",
    "vue/no-multi-spaces": "error",
  },
};
