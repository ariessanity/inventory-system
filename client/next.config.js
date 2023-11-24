/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  publicPath: './',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
