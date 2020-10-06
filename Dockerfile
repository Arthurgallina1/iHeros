FROM node:lts-alpine
WORKDIR /home/tuca/ 
COPY backend/package.json ./
RUN npm install 
COPY . .
EXPOSE 8000
ENTRYPOINT ["sh", "./init.sh"]  