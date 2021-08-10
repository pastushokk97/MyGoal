FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8080

RUN yarn build

RUN mkdir "/uploadData" && mkdir "/uploadData/input"

VOLUME /usr/src/app
VOLUME /uploadData

CMD ["yarn", "start:dev"]