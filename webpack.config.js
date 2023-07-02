import path from 'node:path';
import url from 'node:url';
import { config } from 'dotenv';
config();
import webpack from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import options from './eslint.config.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin(['PORT']),
    new NodemonPlugin(),
    new ESLintPlugin(
      {
        baseConfig: options[0]
      }
    )
  ],
};
