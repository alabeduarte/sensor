const redis = require('redis');
const DatabaseCleaner = require('database-cleaner');
const cleaner = new DatabaseCleaner('redis');
const clean = require('util').promisify(cleaner.clean);

const { SENSOR_REDIS_URL } = process.env;

module.exports = () => clean(redis.createClient(SENSOR_REDIS_URL));
