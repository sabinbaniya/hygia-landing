const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
  extendDefaultRuntimeCaching: true,
});

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});

module.exports = withPWA(
  withMDX({
    experimental: { appDir: true },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  })
);
