web-client := web-client
thermometer-sensor := thermometer-sensor
data-ingestion := data-ingestion
integration-tests := integration-tests

# ---

$(web-client)/node_modules: $(web-client)/package.json
	docker-compose run --rm web-client sh -c 'yarn install && touch node_modules'

$(thermometer-sensor)/node_modules: $(thermometer-sensor)/package.json
	docker-compose run --rm thermometer-sensor sh -c 'yarn install && touch node_modules'

$(data-ingestion)/node_modules: $(data-ingestion)/package.json
	docker-compose run --rm data-ingestion sh -c 'yarn install && touch node_modules'

$(integration-tests)/node_modules: $(integration-tests)/package.json
	docker-compose run --rm integration-tests sh -c 'yarn install && touch node_modules'

# ---

.PHONY: dev
dev: $(web-client)/node_modules $(thermometer-sensor)/node_modules $(data-ingestion)/node_modules
	docker-compose up --build

.PHONY: lint
lint: $(web-client)/node_modules $(thermometer-sensor)/node_modules
	docker-compose run --rm $(web-client) yarn lint
	docker-compose run --rm $(thermometer-sensor) yarn lint

.PHONY: format
format: $(web-client)/node_modules $(thermometer-sensor)/node_modules $(integration-tests)/node_modules
	docker-compose run --rm $(web-client) yarn format
	docker-compose run --rm $(thermometer-sensor) yarn format
	docker-compose run --rm $(integration-tests) yarn format

.PHONY: test
test: $(web-client)/node_modules $(thermometer-sensor)/node_modules lint
	docker-compose run --rm $(web-client) yarn test
	docker-compose run --rm $(thermometer-sensor) yarn test

.PHONY: test.integration
test.integration: lint $(integration-tests)/node_modules
	docker-compose run --rm $(integration-tests) yarn test

.PHONY: test.web-client.watch
test.web-client.watch: $(web-client)/node_modules
	docker-compose run --rm $(web-client) yarn test:watch

.PHONY: test.thermometer-sensor.watch
test.thermometer-sensor.watch: $(thermometer-sensor)/node_modules
	docker-compose run --rm $(thermometer-sensor) yarn test:watch

.PHONY: test.integration.watch
test.integration.watch: lint $(integration-tests)/node_modules
	docker-compose run --rm $(integration-tests) yarn test:watch
