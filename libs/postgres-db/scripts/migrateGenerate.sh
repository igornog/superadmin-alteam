#!/bin/sh

BASEDIR=$(dirname "$0")

"$BASEDIR"/typeormRunner.sh "migration:generate $BASEDIR/../src/migration/$1"
