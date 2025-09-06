# Stage 1: Build the Vue app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN yarn install

# Build the project
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
# EXPOSE 80

# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
