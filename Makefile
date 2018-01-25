web-client := web-client
thermometer-sensor := thermometer-sensor
notification-test := notification

# ---

$(web-client)/node_modules: $(web-client)/package.json
	docker-compose run --rm web-client sh -c 'yarn install && touch node_modules'
to_remove += $(web-client)/node_modules

$(thermometer-sensor)/node_modules: $(thermometer-sensor)/package.json
	docker-compose run --rm thermometer-sensor sh -c 'yarn install && touch node_modules'
to_remove += $(thermometer-sensor)/node_modules

$(notification-test)/node_modules: $(notification-test)/package.json
	docker-compose run --rm notification-test sh -c 'yarn install && touch node_modules'
to_remove += $(notification-test)/node_modules

# ---

.PHONY: dev
dev: $(web-client)/node_modules $(thermometer-sensor)/node_modules
	docker-compose up --build

.PHONY: lint
lint: $(thermometer-sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn lint

.PHONY: format
format: $(thermometer-sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn format

.PHONY: test
test: $(thermometer-sensor)/node_modules lint
	docker-compose run --rm thermometer-sensor yarn test
	docker-compose run --rm notification-test yarn test

.PHONY: test.thermometer-sensor.watch
test.thermometer-sensor.watch: $(thermometer-sensor)/node_modules
	docker-compose run --rm thermometer-sensor yarn test:watch

.PHONY: test.notification.watch
test.notification.watch: $(notification-test)/node_modules
	docker-compose run --rm notification-test yarn test:watch
