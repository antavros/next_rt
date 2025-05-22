module.exports = {
  reactStrictMode: true,
  // experimental: {
  //   reactCompiler: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true, // Разрешение SVG-изображений
    domains: [
      "avatars.mds.yandex.net", // Разрешаем этот домен для изображений
      "imagetmdb.com",
      "image.openmoviedb.com",
      "st.kp.yandex.net",
      "yastatic.net",
      "avatars.githubusercontent.com",
      "avatar.vercel.sh",
      "lh3.googleusercontent.com",
    ],
  },
};
module.exports = {
  reactStrictMode: true,
  // experimental: {
  //   reactCompiler: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
      },
      {
        protocol: "https",
        hostname: "imagetmdb.com",
      },
      {
        protocol: "https",
        hostname: "image.openmoviedb.com",
      },
      {
        protocol: "https",
        hostname: "st.kp.yandex.net",
      },
      {
        protocol: "https",
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
