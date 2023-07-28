FROM node:19-slim As development
USER root

WORKDIR /usr/src/app

RUN apt-get -y update
RUN apt-get -y upgrade

RUN apt-get -y install python3 make g++ openssl procps

COPY package*.json ./

RUN npm i

COPY . .
