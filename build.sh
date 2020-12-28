#! /usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

npm run build:prod

VERSION='1.0.0'
PUSH_IMAGE=${1:-"false"}

IMAGE="docker.io/konmyn/microservice:front-${VERSION}"
docker build -t ${IMAGE} .
if [[ "${PUSH_IMAGE}" != "false" ]]; then
    docker push ${IMAGE}
fi
