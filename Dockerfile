FROM node:13.10-alpine as node-dev
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build --development

FROM node:13.10-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install --prod
COPY --from=node-dev /app/dist/ .
CMD ["node", "."]
EXPOSE 8080
