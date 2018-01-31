const sleep = require('then-sleep');
const { post } = require('./http-client');
const { SENSOR_URL } = process.env;
const URL = `${SENSOR_URL}/thermometer-sensor`;

function getRandomInt(min, max) {
  const { floor, random } = Math;
  return floor(random() * (max - min + 1)) + min;
}

Array.from(Array(10)).forEach(async () => {
  const payload = {
    currentTemperature: getRandomInt(-7, 10),
    idealTemperatureRange: {
      min: getRandomInt(-5, 1),
      max: getRandomInt(2, 8)
    }
  };

  await post(URL, { json: payload });
  await sleep(100);
});
