#!/bin/sh

cd ./kernel && npm run build
cd ../midi-dsl && npm run reload:kernel && npm run langium:generate && npm run build