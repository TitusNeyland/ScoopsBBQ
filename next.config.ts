import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true when building for GitHub Pages (project site). */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/ScoopsBBQ" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
