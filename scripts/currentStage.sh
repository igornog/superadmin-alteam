#!/bin/bash
if [[ ! -v $STAGE ]]; then
  STAGE=$(git branch --show-current)
  if [ "${STAGE}" == "develop" ]
  then
    echo "dev"
  else
    echo "dev"
  fi
else
    echo "$STAGE"
fi
