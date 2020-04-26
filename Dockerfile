FROM node:13.10-alpine as node-dev
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build --development

FROM node:13.10-alpine
WORKDIR /app
EXPOSE 8080
COPY package.json ./
COPY --from=node-dev /app/dist/ ./dist/
RUN yarn install --production
CMD ["yarn", "live"]
