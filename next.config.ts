import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
    // next/image's optimizer fetches source images server-side. FakeStore blocks
    // requests from cloud/datacenter IPs (see products.api.ts), which would break
    // every product image in production. Serving them unoptimized lets the browser
    // fetch them directly instead.
    unoptimized: true,
  },
};

export default nextConfig;
