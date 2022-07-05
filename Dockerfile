FROM node:16-alpine as build
RUN apk update && apk upgrade

RUN mkdir /app

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build


# -- prod server deployment
FROM node:16-alpine

RUN apk update && apk upgrade && apk add git

RUN mkdir -p /app/build

WORKDIR /app

COPY --from=build /app/package*.json .

RUN npm install

COPY --from=build /app/build ./build
COPY --from=build /app/src/auth-config.json ./src/auth-config.json
COPY --from=build /app/server.js .
COPY --from=build /app/api ./api

EXPOSE 3000
EXPOSE 3001

ENV APP_PORT=3000
ENV API_PORT=3001
ENV NODE_ENV=production

CMD ["npm", "run", "prod"]