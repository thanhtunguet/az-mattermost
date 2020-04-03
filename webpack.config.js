const path = require('path');
const NodeExternals = require('webpack-node-externals');
const SourceMapSupport = require('webpack-source-map-support');

module.exports = {
  entry: {
    index: path.resolve('src', 'index.ts'),
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
    ],
    modules: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ]
  },
  devtool: 'source-map',
  target: 'node',
  plugins: [
    new SourceMapSupport(),
  ],
  externals: [
    new NodeExternals(),
  ],
  mode: process.env.NODE_ENV || 'development',
}
