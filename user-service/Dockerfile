FROM node:18-alpine

WORKDIR /app/

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src/

RUN npm install

ENV PORT=3001
ENV NODE_ENV=development 

EXPOSE 3001

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
