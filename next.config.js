/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports
  distDir: 'out',    // Output directory for the build
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for better compatibility with static hosting
  trailingSlash: true,
}

module.exports = nextConfig
