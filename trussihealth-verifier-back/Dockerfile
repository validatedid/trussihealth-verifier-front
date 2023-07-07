# Stage 1 - building node_modules and dist folder
FROM node:16.13-alpine3.14 as builder
RUN apk add python3 make g++ && apk update
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Stage 2
FROM node:16.13-alpine3.14
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules
COPY --from=builder dist dist
COPY package*.json ./
RUN npm prune --production && \
  mkdir log && \
  chown -R node:node log
USER node
ENV NODE_ENV production
CMD [ "node", "dist/main.js" ]