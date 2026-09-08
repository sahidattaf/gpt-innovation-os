import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@gpt-os/ui"],
  allowedDevOrigins: ["terminal.local"],
};

export default config;
