#!/bin/bash

# sh curl-scripts/task/task-create.sh  

TITLE="Curl script 2"
DESCRIPTION="Test"
TOKEN="49be1762d238f80ccace150b0797e9b2"
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