const express = require('express');
const { json } = require('body-parser');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const Validation = require('folktale/validation');

module.exports = function Server({ eventStore }) {
  const server = express();
  server.use(json());

  server.get('/', (_, res) => res.sendStatus(OK));

  server.post('/', ({ body }, res) => {
    const isDataValid = data => {
      const { Success, Failure } = Validation;
      return data.every(d => d !== undefined) ? Success(data) : Failure();
    };

    const { currentTemperature, idealTemperatureRange } = body;

    isDataValid([currentTemperature, idealTemperatureRange]).fold(
      function Failure() {
        res.sendStatus(BAD_REQUEST);
      },
      async function Success() {
        const data = { currentTemperature, idealTemperatureRange };
        await eventStore.store('TEMPERATURE_HAS_CHANGED', { data });
        res.sendStatus(CREATED);
      }
    );
  });

  return server;
};
