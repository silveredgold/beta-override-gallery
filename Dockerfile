# Initiate a container to build the application in.
FROM node:16-alpine as frontend-builder
ENV NODE_ENV=build
ENV VITE_API_URL=/api/
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY src/beta-override-gallery/package*.json ./

# Install the dependencies required to build the application.
RUN npm install

# Copy the application source into the container.
COPY src/beta-override-gallery .

# Build the application.
RUN npm run build

# Uninstall the dependencies not required to run the built application.
RUN npm prune --production

FROM node:16-alpine as backend-builder
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY src/beta-override-store/package*.json ./

# Install the dependencies required to build the application.
RUN npm install

# Copy the application source into the container.
COPY src/beta-override-store .

# Build the application.
RUN npm run build

# Uninstall the dependencies not required to run the built application.
RUN npm prune --production

# Initiate a new container to run the application in.
FROM node:16-alpine
ENV NODE_ENV=production
ENV SPA_BUILD_PATH=client
WORKDIR /usr/src/app

# Copy everything required to run the built application into the new container.
COPY --from=frontend-builder /usr/src/app/dist/ ./client/
COPY --from=backend-builder /usr/src/app/package*.json ./
COPY --from=backend-builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=backend-builder /usr/src/app/dist/ ./dist/

# Expose the web server's port.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/main"]