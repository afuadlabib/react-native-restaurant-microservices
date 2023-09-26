FROM node:18.13.0-bullseye

WORKDIR /orchestrator

ENV PORT=4000

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ./ ./

EXPOSE 4000

CMD [ "npx", "nodemon", "app.js" ]