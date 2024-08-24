FROM --platform=linux/amd64 node:latest
WORKDIR /app
COPY package.json .
COPY package-lock.json . 
COPY tsconfig.json .
COPY .env .
RUN npm install
COPY . .
CMD [ "node", "./dist/server.js"]