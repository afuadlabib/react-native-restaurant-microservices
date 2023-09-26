FROM node:18.13.0-bullseye

WORKDIR /services-app

ENV PORT=4002

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ./ ./

EXPOSE 4002

CMD [ "npx", "nodemon", "app.js" ]