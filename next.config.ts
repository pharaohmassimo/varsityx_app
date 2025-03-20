/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Add the new hostname here
      {
        protocol: "https",
        hostname: "zybo70xqwl.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow ALL domains
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;