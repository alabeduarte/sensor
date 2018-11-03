# sensor

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
$ make test.thermometer-sensor.watch
$ make test.integration.watch
```

### Running locally:

Start the server:

```sh
$ make dev
```

Then, check the API response at http://localhost:8080/thermometer-sensor.

Ingest random data to simulate different temperature ranges:

```sh
$ make send.data
```

### Working in progress:

In the future, a web-client can be listening to all Server-sent events and
display the alerts in real time.
