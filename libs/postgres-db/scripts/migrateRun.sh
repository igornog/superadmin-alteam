#!/bin/bash

BASEDIR=$(dirname "$0")

"$BASEDIR"/typeormRunner.sh migration:run
