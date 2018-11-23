const sleep = require('then-sleep');
const { random } = require('faker');
const { post } = require('./http-client');
const { SENSOR_URL } = process.env;
const URL = `${SENSOR_URL}/thermometer-sensor`;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ingestRandomData = async (sensors) => {
  let count = 0;
  while(count < 100) {
    const randomSensor = sensors[Math.floor(Math.random() * sensors.length)];

    const payload = {
      uuid: randomSensor.uuid,
      currentTemperature: getRandomInt(-6, 9),
      idealTemperatureRange: randomSensor.idealTemperatureRange
    };

    await post(URL, { json: payload });
    await sleep(1000);
    count++;
  }
};

let sensors = [];

Array.from(Array(4)).forEach(async () => {
  const uuid = random.uuid();

  const payload = {
    uuid,
    currentTemperature: getRandomInt(-6, 9),
    idealTemperatureRange: {
      min: getRandomInt(-5, 1),
      max: getRandomInt(2, 8)
    }
  };

  sensors.push(payload);

  await post(URL, { json: payload });
  await sleep(1000);
});

ingestRandomData(sensors);
