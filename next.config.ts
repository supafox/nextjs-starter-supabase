import type { NextConfig } from "next";

import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    resolveAlias: {
      "contentlayer/generated": "./.contentlayer/generated",
    },
  },
};

export default withContentlayer(nextConfig);
