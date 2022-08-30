#!/bin/sh

# sh curl-scripts/task/task-index.sh 

TOKEN="fd5e06b20972cb887e00b6013d56159b"
API="http://localhost:4741"
URL_PATH="/tests/"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo