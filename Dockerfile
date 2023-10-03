# Use an official Node.js runtime as base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all other project files into the container
COPY . .

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Run the Node.js application when the container starts
CMD ["node", "app.js"]
