FROM node:18-alpine

WORKDIR /app/

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src/

RUN npm install

ENV PORT 3001

EXPOSE 3001

CMD ["npm","run","start:dev"]