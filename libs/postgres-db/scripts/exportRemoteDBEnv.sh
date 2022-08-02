#!/bin/sh
BASEDIR=$(dirname "$0")
STAGE=$("$BASEDIR"/../../../scripts/extractIssueId.sh)
export DB_USERNAME=postgres
export DB_NAME=pawmie_db
export DB_PASSWORD=$(aws ssm get-parameter --name db_password --with-decryption --output text --query Parameter.Value)
export DB_ADDRESS=$(aws rds describe-db-instances \
    --query 'DBInstances[*].[Endpoint.Address]' \
    --filters Name=db-instance-id,Values="$STAGE-db" \
    --output text \
    )
