const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const logger = require('./logger');
const Server = require('./web');
const EventStore = require('./event-store');

const eventStore = new EventStore({});

app.use('/thermometer-sensor', new Server({ eventStore }));

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
