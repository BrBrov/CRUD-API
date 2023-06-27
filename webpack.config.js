import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';
import { config } from 'dotenv';
config();
import webpack from 'webpack';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.mode === 'dev' ? 'development' : 'production';

export default {
  mode: mode,
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
    new webpack.EnvironmentPlugin(['PORT'])
  ],
};
