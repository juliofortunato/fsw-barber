/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "*.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
