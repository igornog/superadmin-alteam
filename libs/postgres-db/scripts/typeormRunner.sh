#!/bin/sh

BASEDIR=$(dirname "$0")

if [ "$CI" = "true" ]
then
  . "$BASEDIR"/exportRemoteDBEnv.sh
else
  export DB_ADDRESS='localhost'
  export DB_NAME='postgres'
  export DB_USERNAME='postgres'
  export DB_PASSWORD='postgres'
fi
#. "$BASEDIR"/exportRemoteDBEnv.sh

npx ts-node -T "$BASEDIR"/../../../node_modules/typeorm/cli.js $1 -d "$BASEDIR"/../src/PostgresDataSource.ts
