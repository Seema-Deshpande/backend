FROM node:18-alpine

WORKDIR /COE-GLOBAL_GEMINNI_POC/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]