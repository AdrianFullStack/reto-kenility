FROM node:22.16.0-alpine
RUN apk add --no-cache bash vim curl
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]