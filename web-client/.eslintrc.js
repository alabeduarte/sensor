module.exports = {
  "extends": "airbnb",
  "plugins": ["jest"],
  "env": {
    "es6": true,
    "jest/globals": true,
    "jasmine": true
  },
  "rules": {
  "complexity": ["error", 2]
  }
};
