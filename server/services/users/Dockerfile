FROM node:18.13.0-bullseye


WORKDIR /services-user

ENV PORT=4001

COPY package*.json ./

RUN npm install && npm cache clean --force

RUN npm install --save-dev nodemon

COPY ./ ./

EXPOSE 4001

CMD [ "npx", "nodemon", "app.js" ]