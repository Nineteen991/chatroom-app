FROM node:18-slim

WORKDIR /home/app

COPY package.json .

RUN npm install && npm install -g typescript

COPY . .

RUN tsc

EXPOSE 5000

CMD [ "npm", "start" ]