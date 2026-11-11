import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/MonoChrome",
  images: {
    // The export has no image optimisation server, so next/image renders the
    // source files directly.
    unoptimized: true,
  },
};

export default nextConfig;
