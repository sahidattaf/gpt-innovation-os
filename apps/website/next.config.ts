import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@gpt-os/ui"],
  allowedDevOrigins: ["terminal.local"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default config;
