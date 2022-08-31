#!/bin/bash

# sh curl-scripts/task/task-create.sh  

TITLE="Curl script 2"
DESCRIPTION="Test"
TOKEN="fd5e06b20972cb887e00b6013d56159b"
API="http://localhost:4741"
URL_PATH="/tests"



curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "test": {
      "title": "'"${TITLE}"'",
      "body": "'"${DESCRIPTION}"'"
    }
  }'

echo