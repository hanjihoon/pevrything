/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     appDir: true,
    //   },
    //   reactStrictMode: false, // or remove this line completely
    // compiler: {
    //     styledComponents: true, // Next에게 styled-component도 처리해달라고 옵션을 설정해줌
    //   },
    //   plugins: {
    //     tailwindcss: {},
    //     autoprefixer: {},
    //   },
    }

    module.exports = {
      experimental: {
        turbo: {
          rules: {
            // Option format
            '*.md': [
              {
                loader: '@mdx-js/loader',
                options: {
                  format: 'md',
                },
              },
            ],
            // Option-less format
            '*.mdx': ['@mdx-js/loader'],
          },
        },
      },
    }