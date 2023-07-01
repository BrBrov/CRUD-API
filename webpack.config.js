import path from 'node:path';
import url from 'node:url';
import { config } from 'dotenv';
config();
import webpack from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'node',
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin(['PORT']),
    new NodemonPlugin({
      watch: path.resolve('./dist/server.js'),
      script: path.resolve('./dist/server.js'),
      delay: 500
    }),
  ],
};
