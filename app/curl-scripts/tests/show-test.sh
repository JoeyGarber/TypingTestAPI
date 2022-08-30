#!/bin/sh

# sh curl-scripts/task/task-show.sh  

TOKEN="a3eb8caae9faba782e889c89f649b35f"
ID="630e59aba535d367901dd997"
API="http://localhost:4741"
URL_PATH="/tests"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo