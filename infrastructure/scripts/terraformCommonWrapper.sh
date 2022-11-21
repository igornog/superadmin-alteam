#!/bin/sh
COMMAND=$1
PROJECT=$2
BASEDIR=$(dirname "$0")
STAGE=$("$BASEDIR"/../../scripts/currentStage.sh)

if [ "$KEY" = "prod" ]; then
  ENVIRONMENT="prod"
else
  ENVIRONMENT="int"
fi

terraform init -reconfigure -backend-config="key=${ENVIRONMENT}/${PROJECT}"
terraform "$COMMAND" -var stage="$STAGE" -auto-approve -lock-timeout=5m
