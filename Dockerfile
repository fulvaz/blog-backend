FROM node:10.4.1

WORKDIR /var/
ADD . / app/
ENV NODE_ENV=production
WORKDIR /var/app
RUN yarn install

ENTRYPOINT [ "node", "src/index.js"]