#!/bin/sh
COMMAND=$1
KEY=$2
BASEDIR=$(dirname "$0")
TERRAFORM=$("$BASEDIR"/terraformBinaries.sh)
cd "$BASEDIR"/../ || exit 1
$TERRAFORM init -reconfigure -backend-config="key=${KEY}"
$TERRAFORM "$COMMAND" -var stage="$KEY" -auto-approve -lock-timeout=5m
