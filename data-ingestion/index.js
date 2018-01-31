const sleep = require('then-sleep');
const { random } = require('faker');
const { post } = require('./http-client');
const { SENSOR_URL } = process.env;
const URL = `${SENSOR_URL}/thermometer-sensor`;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.from(Array(10)).forEach(async () => {
  const uuid = random.uuid();

  const payload = {
    uuid,
    currentTemperature: getRandomInt(-6, 9),
    idealTemperatureRange: {
      min: getRandomInt(-5, 1),
      max: getRandomInt(2, 8)
    }
  };

  await post(URL, { json: payload });
  await sleep(1000);
});
