#!/bin/sh
BASEDIR=$(dirname "$0")
STAGE=$("$BASEDIR"/../../../scripts/currentStage.sh)
echo "Exporting database variables for stage $STAGE"

export DB_USERNAME=postgres
export DB_NAME=$([ "$STAGE" = "prod" ] && echo "alteam_db" || echo "$STAGE")
export DB_PASSWORD=$(aws ssm get-parameter --name db_password --with-decryption --output text --query Parameter.Value)
export DB_ADDRESS=$([ "$STAGE" = "prod" ] && echo "prod.db.alteam.io" || echo "int.db.alteam.io")

echo "DB_USERNAME: $DB_USERNAME"
echo "DB_ADDRESS: $DB_ADDRESS"
echo "DB_NAME: $DB_NAME"
