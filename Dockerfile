FROM node:16.17.0-alpine3.13
WORKDIR /usr/src/app 
COPY . .
RUN yarn
CMD ["yarn","production"]

