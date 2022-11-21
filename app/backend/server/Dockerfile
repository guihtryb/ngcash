FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm i -g prisma

RUN npm install

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev" ]