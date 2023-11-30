run dev:
	docker-compose -f docker-compose-dev.yml up

stop dev:
	docker-compose -f docker-compose-dev.yml down

run dev prod:
	docker-compose -f docker-compose-prod.yml up