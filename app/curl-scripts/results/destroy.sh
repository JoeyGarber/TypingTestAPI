#!/bin/bash

API="http://localhost:4741"
URL_PATH="/results"
TOKEN="ae827abd80403443fcfbfea0e7eac097"
TESTID="636442317628911de0afcb07"


curl "${API}${URL_PATH}/${TESTID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \

echo