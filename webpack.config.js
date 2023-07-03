const path = require('path');
const webpack = require('webpack');
const config = require('dotenv').config;
config();
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');

let scriptExec;

if (process.argv[2] === '--mode=production') {
  scriptExec = 'node dist/server.js';
} else {
  scriptExec = 'nodemon dist/server.js --watch';
}


module.exports = {
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
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'http': require.resolve('http'),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin(['PORT']),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [scriptExec],
        blocking: false,
        parallel: true
      }
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true
    }),
    new NodeTargetPlugin()
  ],
};