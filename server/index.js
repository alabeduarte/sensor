const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const Server = require('./web');

app.use('/thermometer-sensor', new Server());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
