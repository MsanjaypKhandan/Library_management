# Use an official Node runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 5000

# Define the command to run your app
CMD ["npm", "start"]
