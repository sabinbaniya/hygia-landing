import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_PRODUCTION_URL: "https://www.hygialens.com",
    NEXT_PUBLIC_BACKEND_PRODUCTION_URL: "https://api.hygialens.com",
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Ldc-HIrAAAAAAOHng2aaBf7NH4T_J2eR4vWG_eK",
  },
};

export default nextConfig;
