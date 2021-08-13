FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8080

RUN yarn build

RUN mkdir "/uploadData" && mkdir "/uploadData/input" && mkdir "/uploadData/output"

VOLUME /usr/src/app

CMD ["yarn", "start:dev"]