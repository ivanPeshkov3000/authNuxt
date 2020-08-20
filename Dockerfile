FROM node:12 As build

ARG APP_DIR=auth_module
RUN mkdir -p ${APP_DIR} && mkdir /src
WORKDIR src

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

from node:alpine

COPY --from=build ./src/build/* /app/

ENTRYPOINT ["/app"]

EXPOSE 3000

CMD [ "npm", "start" ]