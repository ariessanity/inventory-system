/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'build',
  reactStrictMode: true,
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
