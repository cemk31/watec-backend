# Argument for setting node environment, default to production but can be overridden during build time
ARG NODE_ENV=production

# Base image for both development and production
FROM node:20-alpine As base
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

# Install all dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY --chown=node:node . .

# Build the application if necessary, and generate Prisma client
# This step can be skipped if the application does not need a build process
RUN npx prisma generate && npm run build

# Set the environment based on build argument
ENV NODE_ENV=${NODE_ENV}

# Install production dependencies if production, otherwise skip this step
RUN if [ "${NODE_ENV}" = "production" ] ; then npm ci --legacy-peer-deps --only=production && npm cache clean --force ; fi

# Use the node user from the image (instead of the root user)
USER node

# Set the start command for the application
CMD [ "node", "dist/main.js" ]