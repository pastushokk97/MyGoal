#!/usr/bin/bash

#docker exec -it pg_pet_project bash -c "psql -U postgres -c 'CREATE DATABASE tests'"
#docker-compose up
#yarn lint
export PG_PASSWORD='pppp'
export PG_USER='postgres'
export PG_DATABASE='pet_project'

docker-compose up --force-recreate