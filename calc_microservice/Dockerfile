FROM node:16
WORKDIR /usr/src/app
COPY package*.json calcms.js ./
RUN npm install
#EXPOSE 80
CMD ["node", "calcms.js"]
