FROM node:14

WORKDIR /opt/server

COPY package*.json ./
COPY tsconfig.json .
COPY jest.config.js .
COPY src ./src

RUN npm i

RUN npm run db:init
RUN npm run db:seed

RUN npm run build
RUN cp -r src/services/db/sqlite build/services/db/sqlite

ENTRYPOINT npm run start