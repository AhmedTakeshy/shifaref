import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: true,
    // ppr: "incremental",
  },
  bundlePagesRouterDependencies: true,
  logging: {
    fetches: {
      hmrRefreshes: true,
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "ujphcccjpjmikioukwgn.supabase.co",
        protocol: "https",
      }
    ],
  }
};

export default nextConfig;
