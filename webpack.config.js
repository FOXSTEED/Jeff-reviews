const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

// const config = {
//   entry: `${APP_DIR}/index.jsx`,
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?/,
//         include: APP_DIR,
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader',
//       },
//       {
//         test: /\.css$/,
//         loader: 'css-loader',
//         query: {
//           modules: true,
//           localIdentName: '[name]__[local]___[hash:base64:5]',
//         },
//       },
//     ],
//   },
//   resolve: { extensions: ['.jsx', '.js'] },
// };

const common = {
  context: __dirname + '/src',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]" })
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  node: {
    fs: 'empty'
  },
  resolve: { extensions: ['.jsx', '.js'] },
};

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/src/client/public',
    filename: 'app.js'
  },
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/src/client/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];
