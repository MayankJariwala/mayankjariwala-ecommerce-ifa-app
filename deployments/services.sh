#!/bin/sh

TOKEN=1//0dawzNViqwABuCgYIARAAGA0SNwF-L9Ir1z82W69TtuouI4JfAGHy4gW2S9pHBbRTo1JtKAD-TgNa1WY4WNI8T0dxZWmLODrBjuQ

function upload() {
      yarn build
      firebase deploy -m "Auto commit message" --token ${TOKEN}  --project=ecommerce-portal --config=../firebase.json
}


function deploy() {
   upload
}

deploy
