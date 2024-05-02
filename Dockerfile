# Use the official Nginx image as base
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the static files from the app build directory into the container
COPY ./out .

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
