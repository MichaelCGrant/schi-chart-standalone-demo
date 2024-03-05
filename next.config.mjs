/** @type {import('next').NextConfig} */
import CopyPlugin from 'copy-webpack-plugin';

const nextConfig = {
  basePath: '',
  webpack: (config) => {
    const destWasmFolder = "static/chunks/app";
    config.plugins.push(new CopyPlugin({
      patterns: [
        { from: "./node_modules/scichart/_wasm/scichart2d.wasm", to: destWasmFolder },
      ]
    }),)

    // Important: return the modified config
    return config
  }
};

export default nextConfig;
