/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // 'pathname' can be used to restrict paths further, 
        // but '/**' allows any path on that hostname.
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;