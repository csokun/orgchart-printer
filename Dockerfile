FROM node:12-alpine

WORKDIR /app
COPY . /app

RUN npm test

CMD npm start
