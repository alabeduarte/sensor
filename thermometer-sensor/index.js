const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { SENSOR_REDIS_URL, NCHAN_URL } = process.env;

const logger = require('./logger');
const Server = require('./web');
const EventStore = require('./event-store/redis-event-store');
const ThermometerSensor = require('./sensor');
const TemperatureRangeDetector = require('./sensor/temperature-range-detector');
const NChan = require('./transport/nchan');

const eventStore = new EventStore({ url: SENSOR_REDIS_URL });
const temperatureRangeDetector = new TemperatureRangeDetector({ eventStore });
const transport = new NChan({ url: NCHAN_URL });

app.use('/thermometer-sensor', new Server({ eventStore }));

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);

  new ThermometerSensor({ eventStore, transport, temperatureRangeDetector });
});
