web_client := web-client
thermometer_sensor := thermometer-sensor

# ---

$(web_client)/node_modules: $(web_client)/package.json
	docker-compose run --rm web-client sh -c 'yarn install && touch node_modules'
to_remove += $(web_client)/node_modules

$(thermometer_sensor)/node_modules: $(thermometer_sensor)/package.json
	docker-compose run --rm thermometer-sensor sh -c 'yarn install && touch node_modules'
to_remove += $(thermometer_sensor)/node_modules

# ---

.PHONY: dev
dev: $(web_client)/node_modules $(thermometer_sensor)/node_modules
	docker-compose up --build

.PHONY: lint
lint: $(thermometer_sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn lint

.PHONY: format
format: $(thermometer_sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn format

.PHONY: test
test: $(thermometer_sensor)/node_modules lint
	docker-compose run --rm thermometer-sensor yarn test

.PHONY: test.watch
test.watch: $(thermometer_sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn test:watch
