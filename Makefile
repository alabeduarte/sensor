thermometer-sensor := thermometer-sensor
data-ingestion := data-ingestion
integration-tests := integration-tests

# ---

$(thermometer-sensor)/node_modules: $(thermometer-sensor)/package.json
	docker-compose run --rm thermometer-sensor sh -c 'yarn install && touch node_modules'

$(data-ingestion)/node_modules: $(data-ingestion)/package.json
	docker-compose run --rm data-ingestion sh -c 'yarn install && touch node_modules'

$(integration-tests)/node_modules: $(integration-tests)/package.json
	docker-compose run --rm integration-tests sh -c 'yarn install && touch node_modules'

# ---

.PHONY: dev
dev: $(thermometer-sensor)/node_modules $(data-ingestion)/node_modules
	docker-compose up --build

.PHONY: send.data
send.data: $(thermometer-sensor)/node_modules $(data-ingestion)/node_modules lint
	docker-compose run --rm $(data-ingestion) yarn start

.PHONY: lint
lint: $(thermometer-sensor)/node_modules
	docker-compose run --rm $(thermometer-sensor) yarn lint

.PHONY: format
format: $(thermometer-sensor)/node_modules $(integration-tests)/node_modules
	docker-compose run --rm $(thermometer-sensor) yarn format
	docker-compose run --rm $(integration-tests) yarn format

.PHONY: test
test: $(thermometer-sensor)/node_modules lint
	docker-compose run --rm $(thermometer-sensor) yarn test

.PHONY: test.integration
test.integration: $(thermometer-sensor)/node_modules $(integration-tests)/node_modules lint
	docker-compose run --rm $(integration-tests) yarn test

.PHONY: test.thermometer-sensor.watch
test.thermometer-sensor.watch: $(thermometer-sensor)/node_modules
	docker-compose run --rm $(thermometer-sensor) yarn test:watch

.PHONY: test.integration.watch
test.integration.watch: $(thermometer-sensor)/node_modules $(integration-tests)/node_modules lint
	docker-compose run --rm $(integration-tests) yarn test:watch
