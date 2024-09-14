FROM node:20-alpine AS dependencies

ENV NODE_ENV=development

USER node
WORKDIR /home/node

COPY --chown=node:node ./package*.json  /home/node/
RUN npm cache clean --force
RUN npm ci

FROM node:20 AS orm

ENV NODE_ENV=development

RUN npm i -g prisma

USER node
WORKDIR /home/node

COPY --chown=node:node ./package*.json  /home/node/
COPY --from=dependencies --chown=node:node /home/node/node_modules /home/node/node_modules
COPY --chown=node:node ./prisma /home/node/prisma

RUN npx prisma generate

FROM dependencies AS builder

ENV NODE_ENV=development

USER node
WORKDIR /home/node

COPY --chown=node:node ./package*.json  /home/node/
COPY --chown=node:node ./tsconfig.json  /home/node/
COPY --chown=node:node ./tsconfig.build.json  /home/node/
COPY --chown=node:node ./.env /home/node/.env
COPY --chown=node:node ./src /home/node/src
COPY --from=orm --chown=node:node /home/node/prisma /home/node/prisma

RUN npm run build && npm prune --omit=dev

FROM node:20-alpine AS production

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --chown=node:node ./package*.json  /home/node/
COPY --from=dependencies --chown=node:node /home/node/node_modules /home/node/node_modules
COPY --from=orm --chown=node:node /home/node/prisma /home/node/prisma
RUN sleep 5
COPY --from=builder --chown=node:node /home/node/dist /home/node/dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]