API="http://localhost:4741"
URL_PATH="/results"
TOKEN="48840851ebd584693f83b2508cca1e8d"
TESTID="63641fff8aa9cf42f208cea9"
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