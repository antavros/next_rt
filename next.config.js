module.exports = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'avatars.mds.yandex.net',
      },
      {
        hostname: 'imagetmdb.com',
      },
      {
        hostname: 'image.openmoviedb.com',
      },
      {
        hostname: 'st.kp.yandex.net',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ],
  },
}