const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
  extendDefaultRuntimeCaching: true,
});

// Your Next config is automatically typed!
module.exports = withPWA({
  // Your Next.js config
});
