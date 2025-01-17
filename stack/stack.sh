#!/bin/bash
# shellcheck disable=SC2046
set -o allexport
export $(sed 's/#.*//g' ./.env | xargs)
export COMPOSE_CURRENT_DIR=$(pwd)
set +o allexport

chmod 600 "${COMPOSE_CURRENT_DIR}/traefik/config/acme.json"

docker compose \
    --file ./compose.yaml \
    config

docker compose \
    --file ./compose.yaml \
    up
