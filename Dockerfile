FROM node
RUN npm install -g yarn sequelize-cli
RUN yarn install

COPY ./ /var/app/src
WORKDIR /var/app/src

RUN sequelize db:migrate all
RUN sequelize db:seed:all
RUN npm run start
