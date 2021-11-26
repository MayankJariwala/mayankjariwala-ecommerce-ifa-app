#!/bin/sh

TEST_TOKEN=1//0dawzNViqwABuCgYIARAAGA0SNwF-L9Ir1z82W69TtuouI4JfAGHy4gW2S9pHBbRTo1JtKAD-TgNa1WY4WNI8T0dxZWmLODrBjuQ

function upload_to_test_env() {
      yarn build:test
#      firebase use dliveadmin-test --token ${TEST_TOKEN}
      firebase deploy -m "Auto commit message" --token ${TEST_TOKEN}  --project=dliveadmin-test --config=../firebase-test.json
}


function deploy() {
   upload_to_test_env
}

deploy
