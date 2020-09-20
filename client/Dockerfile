FROM node:14

RUN mkdir /opt/client

WORKDIR /opt/client

COPY package*.json ./
COPY tsconfig.json .
COPY src/ ./src/
COPY public/ ./public/

RUN npm install

ENTRYPOINT npm run build