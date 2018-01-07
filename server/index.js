const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const logger = require('./logger');
const Server = require('./web');

app.use('/thermometer-sensor', new Server());

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
