/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: import.meta.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/errors',
  },
};

export default nextConfig;
