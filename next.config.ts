/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ex-market-cap',
  assetPrefix: '/ex-market-cap/',
}

module.exports = nextConfig
