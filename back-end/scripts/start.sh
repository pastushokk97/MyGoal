#!/usr/bin/bash

#docker exec -it pg_pet_project bash -c "psql -U postgres -c 'CREATE DATABASE tests'"
#docker-compose up
#yarn lint
export PORT=8080

export DB_PORT=5432
export DB_USERNAME=postgres
export DB_DATABASE=pet_project
export DB_HOST=postgres
export DB_PASSWORD=prodpassword

export PG_DATABASE=postgres

docker-compose up --force-recreate