FROM --platform=linux/amd64 node:17.3.0

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]