FROM node:22-alpine


WORKDIR /app


COPY package*.json ./


RUN yarn


COPY . .


EXPOSE 5001


CMD ["npx", "json-server", "--watch", "db.json", "--port", "5001"]
