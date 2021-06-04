#!/usr/bin/bash

green() {
  echo -e '\e[32m'$1'\e[m';
}
docker exec -it pg_pet_project bash -c "psql -U postgres -c 'CREATE DATABASE test'"