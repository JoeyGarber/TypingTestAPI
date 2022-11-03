API="http://localhost:4741"
URL_PATH="/results"
TOKEN="f8cbe50dbf294f90a867d8bb560f6d40"


curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo