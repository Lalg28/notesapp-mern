FROM node:14-slim 

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN apt-get update &&\ 
    apt-get install python -y &&\
    apt-get install build-essential -y &&\
    npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
