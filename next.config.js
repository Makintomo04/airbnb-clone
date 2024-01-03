const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add your import alias configurations here
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, 'styles'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      // Add more aliases as needed
    }

    return config
  },
  images: {
    domains: ['avatars.githubusercontent.com',"lh3.googleusercontent.com","res.cloudinary.com"],
  },
}

module.exports = nextConfig
