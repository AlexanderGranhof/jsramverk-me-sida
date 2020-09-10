FROM node:12

RUN mkdir /opt/client

WORKDIR /opt/client

COPY package*.json ./
COPY tsconfig.json .
COPY src/ ./src/
COPY public/ ./public/
COPY .env .

RUN npm i

ENTRYPOINT npm run build