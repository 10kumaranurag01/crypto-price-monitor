# Use the official Node.js image.
FROM node:22

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Expose the port on which your app runs.
EXPOSE 5000

# Command to run your application.
CMD ["node", "src/index.js"]
