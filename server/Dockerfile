FROM node:18-alpine3.14
#postavi radni direktorijum
WORKDIR /usr/src/app
#kopiraj u radni dir listu paketa za instalaciju
COPY package*.json ./ 
RUN npm install 
COPY . . 
RUN npm run build 
EXPOSE 3000
CMD ["npm","run","start:dev"]