#! /usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

npm run build:prod
docker build -t harbor.beautytiger.com/docker.io/mytao-front:1.0.0 .
