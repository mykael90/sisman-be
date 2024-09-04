#!/bin/bash

npm i
# npx prisma migrate dev --name init

if [! -f ".env" ]; then
 cp .env.example .env
fi

tail -f /dev/null