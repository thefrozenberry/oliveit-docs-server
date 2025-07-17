module.exports = {
  apps: [{
    name: 'oliveit-api',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 6000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 6000
    }
  }]
}; 