const redisCleaner = require('./redis');

module.exports = async () => {
  await redisCleaner();
};
