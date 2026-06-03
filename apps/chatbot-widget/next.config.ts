import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@gpt-os/ui", "@gpt-os/agents", "@gpt-os/prompts"],
};

export default config;
