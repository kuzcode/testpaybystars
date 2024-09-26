/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:4173"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/peoplenearby-images/**",
      },
    ],
  },
};

export default nextConfig;
