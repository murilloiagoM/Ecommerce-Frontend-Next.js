/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/cadastro',
        destination: '/pages/cadastro',
      },
      {
        source: '/login',
        destination: '/pages/login',
      },
      {
        source: '/novoproduto',
        destination: '/pages/novoproduto',
      },
      {
        source: '/meusprodutos',
        destination: '/pages/meusprodutos',
      },
      {
        source: '/pageproduto',
        destination: '/pages/pageproduto'
      },
      {
        source: '/carrinho',
        destination: '/pages/carrinho'
      }
    ];
  },
};

export default nextConfig;
