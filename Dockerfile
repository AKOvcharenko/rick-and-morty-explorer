# stage1 as builder
FROM node:20-alpine3.17 as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /rick-and-morty-explorer && mv ./node_modules ./rick-and-morty-explorer

WORKDIR /rick-and-morty-explorer

COPY . .

# Build the project and copy the files
RUN npm run build

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=builder /rick-and-morty-explorer/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]