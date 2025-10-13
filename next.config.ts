import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  // For static export, we need to use unoptimized images
  // or configure a custom image loader
  images: {
    unoptimized: true,
  },
  
  // Optional: Specify the output directory
  // distDir: 'out', // default for static export
};

export default nextConfig;
