/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt', 'mongodb'];
    return config;
  },
};

module.exports = nextConfig;
