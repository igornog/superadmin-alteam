#!/bin/bash

COMMAND=$1
PROJECT=$2
BASEDIR=$(dirname "$0")
STAGE=$("$BASEDIR"/../../scripts/currentStage.sh)
KEY="${STAGE}/${PROJECT}"
terraform init -reconfigure -backend-config="key=${KEY}"
terraform "$COMMAND" -var stage="$STAGE" -auto-approve -lock-timeout=5m
