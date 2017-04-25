#!/bin/bash
npm run deploy
mkdir -p zip/dist
cp index.html zip/
cp dist/* zip/dist/
cd zip
rm ld38.zip
zip -r ld38.zip *
