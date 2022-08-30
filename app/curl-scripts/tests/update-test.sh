#!/bin/bash

# sh curl-scripts/task/task-update.sh  

TOKEN="a3eb8caae9faba782e889c89f649b35f"
ID="630e59aba535d367901dd997"
TITLE="UPDATE"
BODY="WORKS"
API="http://localhost:4741"
URL_PATH="/tests"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
      "test": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'"
    }
  }'

echo