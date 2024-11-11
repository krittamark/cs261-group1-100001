# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the port the frontend will run on
EXPOSE 3001

# Start the frontend server
CMD ["npm", "start"]
