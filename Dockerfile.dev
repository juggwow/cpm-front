FROM trion/ng-cli-e2e:11.0.0 as builder
ARG environment

WORKDIR /app
COPY package.json  /app
RUN npm install

COPY .  /app
RUN ng build -c $environment

FROM nginx:1.23.0-alpine

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/cmdc-ng /usr/share/nginx/html
