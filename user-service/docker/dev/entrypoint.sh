#!/bin/sh

echo "Running in environment: $NODE_ENV"

if [ "$NODE_ENV" = "development" ]; then
  npm run start:dev
else
  npm run start
fi