# sensor

[![travis build](https://img.shields.io/travis/alabeduarte/sensor.svg)](https://travis-ci.org/alabeduarte/sensor)

### Requirements:

* docker
* docker-compose

### Commands Menu:

```sh
$ make dev
$ make lint
$ make format
$ make test
$ make test.integration

# test watchers
$ make test.web-client.watch
$ make test.thermometer-sensor.watch
$ make test.integration.watch
```

### Running locally:

Start the server:

```sh
$ make dev
```

Then, try this address on your browser: http://localhost:3000

![alt screenshot](https://user-images.githubusercontent.com/418269/48978959-20f8aa80-f108-11e8-95ae-360544adb1bb.png)

### Data Ingestion

Ingest random data to simulate different temperature ranges:

1. Check the list of measured temperatures in http://localhost:8080/thermometer-sensor
2. Grab some random `uuid` (e.g.: `c2997731-db64-4e37-ad1b-8537c07f31c2`) and and trigger the following POST request from your terminal:

  ```sh
  $ curl -H "Content-Type: application/json" \
    -d '{"uuid": "c2997731-db64-4e37-ad1b-8537c07f31c2", "currentTemperature": 15, "idealTemperatureRange": { "min": -5, "max": 8 }}' \
    http://localhost:8080/thermometer-sensor
  ```
_Please note that the endpoint must contain all data regarding the sensor, even though they might sound duplicate (e.g.  `idealTemperatureRange`)._
