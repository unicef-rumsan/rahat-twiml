FROM node:16.17-alpine3.15
WORKDIR /usr/src/app 
COPY . .
RUN yarn
CMD ["yarn","production"]

