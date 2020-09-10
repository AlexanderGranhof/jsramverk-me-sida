FROM node:12

RUN mkdir /opt/server

WORKDIR /opt/server

COPY package*.json ./
COPY tsconfig.json .
COPY src ./src

RUN npm i

ENTRYPOINT npm run start