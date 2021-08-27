FROM node:14-slim 

ENV PORT=3001
ENV MONGO_DB_URI=mongodb+srv://admin:admin@cluster0.hqruz.mongodb.net/notesapp?retryWrites=true&w=majority
ENV MONGO_DB_URI_TEST=mongodb+srv://admin:admin@cluster0.hqruz.mongodb.net/notesapp-test?retryWrites=true&w=majority
ENV SECRET=secreto

WORKDIR /usr/src/app

COPY ./package.json ./

RUN apt-get update &&\ 
    apt-get install python -y &&\
    apt-get install build-essential -y &&\
    npm i

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
