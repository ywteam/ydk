#!/bin/bash
set -e
export PATH="${PATH}:/usr/local/go/bin"
export PATH="${PATH}:/usr/local/deno/bin"
export PATH="${PATH}:/usr/bin/python3.12"
dotnet --version # || install:dotnet "8.0"
go version # || install:go "1.23.0"
node --version # || install:node "v20.17.0" "v0.40.1"
deno --version # || install:deno "v1.46.2"
python3.12 --version # || install:python "3.12"
php --version # || install:php "8.4"