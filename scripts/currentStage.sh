#!/bin/bash
if [[ ! -v STAGE ]]; then
    echo "dev"
else
    echo "$STAGE"
fi
