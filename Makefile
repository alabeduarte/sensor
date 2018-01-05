client := client

# ---

$(client)/node_modules: $(client)/package.json
	docker-compose run --rm client sh -c 'npm install && touch node_modules'
to_remove += $(client)/node_modules

# ---

.PHONY: dev
dev: $(client)/node_modules
	docker-compose up --build client
