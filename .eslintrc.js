module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "no-unused-vars": "off",
    "no-irregular-whitespace": "off",
    "@typescript-eslint/no-unused-vars": "error",
  }
}
