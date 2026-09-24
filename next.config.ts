import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16.3.5 exposes this option through its experimental config schema.
  // Product galleries may contain three optimized images in one submission.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dratbz8bh/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};

export default nextConfig;
