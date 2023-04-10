# syntax=docker/dockerfile:1
FROM node:gallium-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5173
CMD [ "npm", "run", "dev"]