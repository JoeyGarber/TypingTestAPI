API="http://localhost:4741"
URL_PATH="/results"
TOKEN="f66f27fe5305eeffae56aa5cfa6afe88"
TESTID="6364078758e5d1095179058b"
WPM=50
ACCURACY=100

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