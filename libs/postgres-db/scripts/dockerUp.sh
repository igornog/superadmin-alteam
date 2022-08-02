#!/bin/sh
BASEDIR=$(dirname "$0")

if ! pgrep -f "cd $BASEDIR; docker compose up" > /dev/null
then
  x-terminal-emulator -e "cd $BASEDIR; docker compose up"
fi

#docker rm -f $(docker ps -a -q)
