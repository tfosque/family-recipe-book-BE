# Use Node.js as the base image
FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

ENV MONGODB_URI mongodb+srv://tfosque:fosque14@familybookcluster.nraprzf.mongodb.net/family-book-db?retryWrites=true&w=majority

# Copy app source
COPY . .

# Build the Next.js app
RUN npm run build

# Start the app
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 3000