FROM ubuntu:latest
 
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
 
WORKDIR /app
 
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
 
RUN npm install
RUN npm install -g typescript

 
COPY . .
 
EXPOSE 3000
 
CMD ["npm", "run", "dev"]