import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: true,
    ppr: "incremental",
  },
  bundlePagesRouterDependencies: true,
  logging: {
    fetches: {
      hmrRefreshes: true,
      fullUrl: true,
    },
  },
};

export default nextConfig;
