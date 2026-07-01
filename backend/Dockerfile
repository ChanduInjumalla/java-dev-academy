FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openjdk17

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD sh -c "npx prisma db push --accept-data-loss && npx tsx create-admin.ts && npm run dev"
