#!/bin/sh

cd ./kernel && npm install && npm run build
cd ../midi-dsl && npm install && npm run reload:kernel && npm run langium:generate && npm run build