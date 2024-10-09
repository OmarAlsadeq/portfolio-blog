/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['sequelize', 'mysql2'], // Add Sequelize and MySQL2 here
    },
  };
  
  export default nextConfig;
  