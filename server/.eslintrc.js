module.exports = {
  "plugins": ["jest"],
  "env": {
    "es6": true,
    "node": true,
    "jest/globals": true,
    "jasmine": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "rules": {
    "complexity": ["error", 2],
    "no-unused-vars": ["error", { "args": "all", "argsIgnorePattern": "^_" }],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
};
