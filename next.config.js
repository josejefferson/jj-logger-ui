/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    LOGS_DATA_URL: process.env.NODE_ENV === 'development' ? process.env.LOGS_DATA_URL : undefined,
    LOGS_DATA_USERNAME: process.env.NODE_ENV === 'development' ? process.env.LOGS_DATA_USERNAME : undefined,
    LOGS_DATA_PASSWORD: process.env.NODE_ENV === 'development' ? process.env.LOGS_DATA_PASSWORD : undefined
  }
}

if (process.env.NODE_ENV === 'production') {
  nextConfig.assetPrefix = '.'
}

module.exports = nextConfig
