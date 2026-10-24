import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {remotePatterns: [{protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**"}]},
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
