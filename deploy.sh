#!/bin/bash

echo "Deploying OliveIt API server..."

# Stop the current server if running
echo "Stopping current server..."
pm2 stop oliveit-api || true
pm2 delete oliveit-api || true

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server with PM2
echo "Starting server with PM2..."
pm2 start server.js --name oliveit-api

# Save PM2 configuration
pm2 save

# Reload nginx configuration
echo "Reloading nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx

echo "Deployment completed!"
echo "Server should be running on port 6000"
echo "Nginx should be proxying from port 80 to port 6000" 