import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'uploads-ssl.webflow.com',
      },
      {
        hostname: 'findicons.com',
      },
      
    ],
  },
};

export default nextConfig;
