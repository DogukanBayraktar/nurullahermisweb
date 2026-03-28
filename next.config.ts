import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/tedavilerimiz/ortopedi-egzersizleri/skolyoz-egzersizleri',
        destination: '/saglik-rehberi/skolyoz-egzersizleri',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;