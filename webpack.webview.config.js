// tslint:disable:no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsConfigPath = path.join(__dirname, './tsconfig.json');
const distDir = path.join(__dirname, './dist/webview');

module.exports = {
  entry: require.resolve('@opensumi/ide-webview/lib/webview-host/web-preload.js'),
  output: {
    filename: 'webview.js',
    path: distDir,
  },
  target: 'webworker',
  node: {
    net: 'empty',
  },
  mode: 'production',
  devtool: 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [new TsconfigPathsPlugin({
      configFile: tsConfigPath,
    })],
  },
  module: {
    // https://github.com/webpack/webpack/issues/196#issuecomment-397606728
    exprContextCritical: false,
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        configFile: tsConfigPath,
        happyPackMode: true,
        transpileOnly: true,
        compilerOptions: {
          target: 'es2017',
        },
      }
    },
    ],
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/webview.html',
    }),
  ],
};
