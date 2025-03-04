import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/production/:path*`,
        destination: `${process.env.API_URL}/:path*`,
        basePath: false
      }
    ];
  },
};

export default nextConfig;
