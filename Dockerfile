# Setup a development stage
# This can be used with the development and test flows 
FROM node:20 AS development

# Create required directories and add permissions to the node user
RUN mkdir /srv/notification-service && chown node:node /srv/notification-service

RUN chown node /srv/notification-service

USER node

WORKDIR /srv/notification-service

# copy over the package file to install dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node check-node-version.js ./

RUN npm install

# Start the production build stage 
# This stage can use the modules we installed in the last stage 
# copy over only the required files to make a smaller container
FROM node:20-slim AS production

# Create required directories and add permissions to the node user
RUN mkdir /srv/notification-service && chown node:node /srv/notification-service

USER node

WORKDIR /srv/notification-service

COPY --from=development --chown=node:node /srv/notification-service/node_modules ./node_modules

COPY --chown=node:node . .

CMD ["sh", "bin/entrypoint.production.sh"]