FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openjdk17

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
