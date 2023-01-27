FROM trion/ng-cli-e2e:15.1.1 as builder
ARG environment

WORKDIR /app
COPY package.json  /app
RUN npm install --force

COPY .  /app
RUN ng build -c 

FROM nginx:1.23.0-alpine

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/cpm-rad-frontend /usr/share/nginx/html
