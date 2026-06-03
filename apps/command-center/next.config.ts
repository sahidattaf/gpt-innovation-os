import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@gpt-os/ui", "@gpt-os/database", "@gpt-os/auth", "@gpt-os/agents"],
};

export default config;
