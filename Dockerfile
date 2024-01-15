# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000
EXPOSE 4000

# Start the app
CMD [ "node", "./src/index.ts" ]