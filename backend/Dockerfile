FROM node:14

WORKDIR /backend

ENV PORT 3000

COPY package.json /backend/package.json

RUN npm install
RUN npm install bcrypt
COPY . /backend

VOLUME ["/data"]

EXPOSE 3000

CMD ["node", "app.js"]