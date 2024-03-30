/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {

        // Enable raw imports for .glsl files
        config.module.rules.push(
            {
                test: /\.glsl$/,
                type: 'asset/source',
            }
        )

        return config
    },
};

export default nextConfig;
