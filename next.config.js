/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn0.iconfinder.com',
                port: '',
                pathname: '/data/icons/**',
            },
        ],
    },
}

module.exports = nextConfig
