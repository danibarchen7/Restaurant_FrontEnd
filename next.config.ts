// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["https://restaurant-1-coe8.onrender.com"], // Replace with your actual Render domain
    unoptimized: true, // Helps bypass optimization issues in Render deployments
  },
};

export default nextConfig;
