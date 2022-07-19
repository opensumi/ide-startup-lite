const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsConfigPath = path.join(__dirname, './tsconfig.json');

module.exports = {
  entry: path.join(__dirname, 'webview-host/web-preload.ts'),
  node: {
    net: 'empty',
    child_process: 'empty',
    path: 'empty',
    url: false,
    fs: 'empty',
    process: 'mock',
  },
  output: {
    filename: 'webview.js',
    path: path.join(__dirname, 'dist/webview'),
  },
  resolve: {
    extensions: ['.ts'],
  },
  bail: true,
  mode: 'production',
  devtool: 'false',
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true,
          transpileOnly: true,
          configFile: tsConfigPath,
        },
      },
    ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, './node_modules'),
      path.resolve('node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'webview-host/webview.html'),
    }),
  ],
};
