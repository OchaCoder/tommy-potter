import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "wp-tommy-potter.ochacoder.com",
        pathname: "/wp-content/uploads/**", // allow anything in uploads folder
      },
    ],
  },
}

export default nextConfig
