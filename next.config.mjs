/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages:['mongoose','@typegoose/typegoose']
},
  // basePath: '/email',
  assetPrefix: '/email',
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "stghrms.paxanimi.ai",
      pathname: '/**',
      port: '',
    },
  ],
},
};

export default nextConfig;
