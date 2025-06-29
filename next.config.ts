import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_PRODUCTION_URL: "https://www.hygialens.com",
    NEXT_PUBLIC_BACKEND_PRODUCTION_URL: "https://api.hygialens.com/",
  },
};

export default nextConfig;
