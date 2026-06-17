import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@gpt-os/catalog", "@gpt-os/ui", "@gpt-os/database", "@gpt-os/auth"],
};

export default config;
