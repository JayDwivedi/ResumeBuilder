/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for Firebase Hosting
  images: {
    unoptimized: true, // Required for static export
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
