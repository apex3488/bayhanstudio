import type { NextConfig } from "next";

// GitHub Pages project site: apex3488.github.io/bayhanstudio/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/bayhanstudio";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
