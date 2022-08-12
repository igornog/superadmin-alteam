#!/bin/sh
COMMAND=$1
STAGE=prod
BASEDIR=$(dirname "$0")
"$BASEDIR"/terraformWrapper.sh "$COMMAND" "$STAGE"
