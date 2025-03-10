/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false }
    return config
  },
}

module.exports = nextConfig

