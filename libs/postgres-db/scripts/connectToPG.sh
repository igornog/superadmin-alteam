#!/bin/sh
BASEDIR=$(dirname "$0")

. "$BASEDIR"/exportRemoteDBEnv.sh

docker run -p 82:80 \
  -e "POSTGRES_USER=$DB_USERNAME" \
  -e "POSTGRES_PASSWORD=$DB_PASSWORD" \
  -e "POSTGRES_HOST=$DB_ADDRESS" \
  dcagatay/pwless-pgadmin4
