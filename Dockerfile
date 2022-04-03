FROM node:14.19.0

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 1337

CMD npm start