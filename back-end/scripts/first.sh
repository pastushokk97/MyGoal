#!/usr/bin/bash

green() {
  echo -e '\e[32m'$1'\e[m';
}
docker exec -it pg_pet_project bash
then
psql -U postgres
ssh CREATE DATABASE test;