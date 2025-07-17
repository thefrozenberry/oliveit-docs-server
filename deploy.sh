#!/bin/bash

echo "Deploying OliveIt API server..."

# Stop the current server if running
echo "Stopping current server..."
pm2 stop oliveit-docs-server || true
pm2 delete oliveit-docs-server || true

# Install dependencies with the correct Express version
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
PORT=6000
MONGO_URI=mongodb+srv://oliveit:docs@cluster0.1fibmaf.mongodb.net/OliveIt?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
EOF
fi

# Start the server with PM2
echo "Starting server with PM2..."
pm2 start server.js --name oliveit-docs-server

# Save PM2 configuration
pm2 save

# Copy nginx configuration
echo "Updating nginx configuration..."
cp nginx.conf /etc/nginx/sites-available/popcorn.oliveit.club

# Test and reload nginx configuration
echo "Testing nginx configuration..."
nginx -t && sudo systemctl reload nginx

echo "Deployment completed!"
echo "Server should be running on port 6000"
echo "Nginx should be proxying from port 80 to port 6000"
echo "Check status with: pm2 status"
echo "Check logs with: pm2 logs oliveit-docs-server" 