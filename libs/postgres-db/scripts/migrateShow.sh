#!/bin/sh

BASEDIR=$(dirname "$0")

"$BASEDIR"/typeormRunner.sh migration:show
