const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const PostTemperatureData = require('./post-temperature-data');

module.exports = function Server({ eventStore }) {
  const server = express();
  server.use(json());
  server.use(cors());

  server.get('/', async (_, res) => {
    res.status(OK).send(await eventStore.all());
  });

  server.post('/', async ({ body }, res) => {
    const { uuid, currentTemperature, idealTemperatureRange } = body;
    const command = await PostTemperatureData({ eventStore })({
      data: {
        uuid,
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
