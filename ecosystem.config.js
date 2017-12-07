module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'next-webrtc',
      script: 'app.js',
      env: {},
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'rascarlito',
      host: 'next-webrtc.carlogren.com',
      ref: 'origin/master',
      repo: 'git@github.com:RasCarlito/next-webrtc.git',
      path: '/home/rascarlito/www/next-webrtc',
      'post-deploy': 'npm install && npm run build && npm run pm2-restart'
    }
  }
}
