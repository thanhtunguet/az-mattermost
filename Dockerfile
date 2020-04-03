FROM node:13.10-alpine as node-dev
WORKDIR /src
COPY . .
RUN yarn install
RUN yarn build --development

FROM node:13.10-alpine
WORKDIR /src
COPY package.json ./
RUN yarn install --prod
COPY --from=node-dev /src/dist/ .
CMD ["node", "."]
EXPOSE 8080
