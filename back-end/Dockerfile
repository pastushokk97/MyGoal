FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

RUN yarn build

VOLUME /usr/src/app

CMD ["node", "dist/main"]