#!/usr/bin/env bash
rm -rf node_modules example/node_modules example/public
cd example && yarn && yarn production
