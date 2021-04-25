FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8080

RUN yarn build

VOLUME /usr/src/app

CMD ["yarn", "start:prod"]