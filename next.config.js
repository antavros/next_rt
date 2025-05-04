module.exports = {
  // experimental: {
  //   reactCompiler: true,
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        hostname: "avatars.mds.yandex.net",
      },
      {
        hostname: "imagetmdb.com",
      },
      {
        hostname: "image.openmoviedb.com",
      },
      {
        hostname: "st.kp.yandex.net",
      },
      {
        hostname: "yastatic.net",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};
