#!/bin/sh
BASEDIR=$(dirname "$0")
STAGE=$("$BASEDIR"/../../../scripts/currentStage.sh)
if [ "$STAGE" = "prod" ]
then
  echo "Not creating database because running in prod"
  exit 0
fi
. "$BASEDIR"/exportRemoteDBEnv.sh

which -s psql

echo "Creating database..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_ADDRESS" -U "$DB_USERNAME" -c "create database \"$STAGE\";" || true

