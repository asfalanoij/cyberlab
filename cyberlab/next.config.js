/** @type {import('next').NextConfig} */
const nextConfig = {
  // Notebooks are read from the file system at build time
  // This path alias allows notebooks/ to be resolved from app/
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path'],
  },
}

module.exports = nextConfig
