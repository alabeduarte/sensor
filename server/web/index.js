const express = require('express');

module.exports = function Server() {
  const server = express();
  server.get('/', (req, res) => res.send('hello world'));

  return server;
}
