import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the project root so a parent directory's lockfile/proxy.ts is never picked up.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
