FROM node

EXPOSE 3000

RUN mkdir -p /drones
WORKDIR /drones

COPY public /drones/public
COPY src /drones/src
COPY package-lock.json /drones/
COPY package.json /drones/
COPY .babelrc /drones/

RUN npm i
RUN npm run build
RUN npm run serve