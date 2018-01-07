client := client
server := server

# ---

$(client)/node_modules: $(client)/package.json
	docker-compose run --rm client sh -c 'yarn install && touch node_modules'
to_remove += $(client)/node_modules

$(server)/node_modules: $(server)/package.json
	docker-compose run --rm server sh -c 'yarn install && touch node_modules'
to_remove += $(server)/node_modules

# ---

.PHONY: dev
dev: $(client)/node_modules $(server)/node_modules
	docker-compose up --build

.PHONY: test
test: $(server)/node_modules
	docker-compose run --rm server yarn test
