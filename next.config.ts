import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "restaurant-ieuk.onrender.com",
        pathname: "/**", // Allows all images from the domain
      },
    ],
  },
  allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000","http://127.0.0.1:8000", "http://localhost:8000","https://restaurant-ieuk.onrender.com","https://restaurant-ieuk.onrender.com/media/"],
};
  /* config options here */

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["https://restaurant-1-coe8.onrender.com"], // Replace with your actual Render domain
//     unoptimized: true, // Helps bypass optimization issues in Render deployments
//   },
// };

// export default nextConfig;
