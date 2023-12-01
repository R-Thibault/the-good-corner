FROM node:20.10.0-alpine3.18

WORKDIR /app
COPY package.json package.json
RUN npm i

COPY src src
COPY tsconfig.json tsconfig.json


CMD npm start