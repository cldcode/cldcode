FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* /app/
RUN npm install --production || true
COPY . /app
EXPOSE 4000
CMD ["node", "src/index.js"]
