const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
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
});
