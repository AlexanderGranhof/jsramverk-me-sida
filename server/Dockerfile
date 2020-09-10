FROM node:13

RUN mkdir /opt/server

WORKDIR /opt/server

COPY package*.json ./
COPY tsconfig.json .
COPY src ./src

RUN npm i

RUN npm run db:init

ENTRYPOINT npm run start