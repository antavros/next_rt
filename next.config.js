const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
};

module.exports = nextConfig;

module.exports = {
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
        ],
    },
}