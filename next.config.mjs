import MDX from '@next/mdx'

const withMDX = MDX()

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        // use new rust compiler for MDX
        mdxRs: true
    },

    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {

        // Enable raw imports for .glsl files
        config.module.rules.push({
            test: /\.glsl$/, type: 'asset/source',
        })

        return config
    },
});

export default nextConfig;
