/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/lobby",
        destination: "/video-meet/lobby",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
