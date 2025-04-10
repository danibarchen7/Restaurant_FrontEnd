import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zum.pythonanywhere.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "http://localhost:3000",        // Frontend origin (Next.js dev server)
    "http://127.0.0.1:3000",        // Alternative localhost IP
    "http://[::1]:3000",            // IPv6 localhost
  ],
};

export default nextConfig;