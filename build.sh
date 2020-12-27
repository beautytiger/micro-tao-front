#! /usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

npm run build:prod

IMAGE='docker.io/konmyn/microservice:front-1.0.0'
docker build -t ${IMAGE} .
docker push ${IMAGE}
