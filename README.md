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
$ make test.thermometer-sensor.watch
$ make test.integration
$ make test.integration.watch
$ make send.data
```

### Running locally:

Start the server:

```sh
$ make dev
```

Then, try this address on your browser: http://localhost:3000

![alt screenshot](https://user-images.githubusercontent.com/418269/47964322-73582580-e08c-11e8-8226-34f14d159e81.png)

### Data Ingestion
Ingest random data to simulate different temperature ranges:

```sh
$ make send.data
```

### Working in progress:

In the future, a web-client can be listening to all Server-sent events and
display the alerts in real time.
