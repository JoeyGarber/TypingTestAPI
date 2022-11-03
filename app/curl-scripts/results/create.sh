API="http://localhost:4741"
URL_PATH="/results"
TOKEN="46bad51a0d66e06dce4d932717b540ca"
TESTID="63641fff8aa9cf42f208cea8"
WPM="60"
ACCURACY="100"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "results": {
      "WPM": "'"${WPM}"'",
      "Accuracy": "'"${ACCURACY}"'",
      "Test": "'"${TESTID}"'"
    }
  }'

echo