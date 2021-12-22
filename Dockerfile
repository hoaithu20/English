ARG NODE_VERSION=17.0.1

FROM node:${NODE_VERSION}-alpine as build
RUN echo "Node $(node -v) / NPM v$(npm -v) / YARN v$(yarn -v)"
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src/
RUN yarn build:prod

FROM node:${NODE_VERSION}-alpine as deps
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --prod

FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY .env.prod .env
COPY static ./static/

EXPOSE 4000
CMD ["node", "dist/main"]