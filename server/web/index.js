const express = require('express');

module.exports = function Server() {
  const server = express();
  server.get('/', (_, res) => res.send('hello world'));

  return server;
};
