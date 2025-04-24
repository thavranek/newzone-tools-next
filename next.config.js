/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['newzone.audio'],
    },
    // Explicitly set output mode
    output: 'export', // This is specifically for Netlify static deployments
    // Disable image optimization for Netlify static deployments
    images: {
      unoptimized: true,
      domains: ['newzone.audio']
    }
  };
  
  module.exports = nextConfig;