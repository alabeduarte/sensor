const express = require('express');
const { json } = require('body-parser');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const PostTemperatureData = require('./post-temperature-data');

module.exports = function Server({ eventStore }) {
  const server = express();
  server.use(json());

  server.get('/', (_, res) => res.sendStatus(OK));

  server.post('/', async ({ body }, res) => {
    const { currentTemperature, idealTemperatureRange } = body;
    const command = await PostTemperatureData({ eventStore })({
      data: {
        currentTemperature,
        idealTemperatureRange
      }
    });

    command.fold(
      () => {
        res.sendStatus(BAD_REQUEST);
      },
      () => {
        res.sendStatus(CREATED);
      }
    );
  });

  return server;
};
