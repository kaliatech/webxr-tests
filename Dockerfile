# https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html

FROM node:lts-alpine

RUN apk add --update bash git vim

#RUN npm i -g create-nuxt-app npm-check-updates @vue/cli
RUN npm i -g npm-check-updates

# make the 'app' folder the current working directory
WORKDIR /app

ENV NUXT_HOST=0.0.0.0

EXPOSE 4000

ENTRYPOINT ["/bin/bash"]