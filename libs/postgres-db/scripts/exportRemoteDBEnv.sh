#!/bin/sh
BASEDIR=$(dirname "$0")
STAGE=prod
export AWS_PROFILE=yjc-dev
export DB_USERNAME=postgres
export DB_NAME=yjc_db
export DB_PASSWORD=$(aws ssm get-parameter --name db_password --with-decryption --output text --query Parameter.Value)
export DB_ADDRESS=$(aws rds describe-db-instances \
    --query 'DBInstances[*].[Endpoint.Address]' \
    --filters Name=db-instance-id,Values="$STAGE-db" \
    --output text \
    )
