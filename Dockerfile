FROM node:10.4.1
RUN apt-get update && apt-get install vim mysql-client -y
RUN npm install -g yarn sequelize-cli
RUN yarn install

WORKDIR /var/
ADD . / app/

ENV NODE_ENV=test
WORKDIR /var/app
RUN yarn install
RUN chmod +x docker-app-entry.sh
RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "./docker-app-entry.sh" ]