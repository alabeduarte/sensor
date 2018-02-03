module.exports = {
  "plugins": ["jest", "react"],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true,
    "jasmine": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  "rules": {
    "complexity": ["error", 2],
    "no-unused-vars": ["error", { "args": "all", "argsIgnorePattern": "^_" }],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "react/display-name": "off",
    "react/prop-types": "off"
  }
};
