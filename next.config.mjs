/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose']
  },
  // basePath: '/email',
  // assetPrefix: '/email',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging.blazeup.ai",
        pathname: '/**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
