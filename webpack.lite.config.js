const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const darkTheme = require('@ant-design/dark-theme');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const fs = require('fs');

const tsConfigPath = path.join(__dirname, './tsconfig.json');
const dir = path.resolve('.')
const port = 8080;

const isDevelopment = process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'dev';
if (isDevelopment) {
  require('dotenv').config();
}

const styleLoader = process.env.NODE_ENV === 'production'
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = {
  entry: dir + '/app',
  node: {
    net: "empty",
    child_process: "empty",
    path: "empty",
    url: false,
    fs: "empty",
    process: false,
    Buffer: false
  },
  output: {
    filename: 'bundle.js',
    path: dir + '/dist'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [new TsconfigPathsPlugin({
      configFile: tsConfigPath,
    })],
    alias: {
      'fs': 'browserfs/dist/shims/fs.js',
      'buffer': 'browserfs/dist/shims/buffer.js',
      'path': 'browserfs/dist/shims/path.js',
      'processGlobal': 'browserfs/dist/shims/process.js',
      'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
      'bfsGlobal': require.resolve('browserfs')
    },
  },
  bail: true,
  mode: process.env['NODE_ENV'],
  devtool: isDevelopment ? 'source-map' : 'null',
  module: {
    // https://github.com/webpack/webpack/issues/196#issuecomment-397606728
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [['import', {"libraryName": "antd", style: 'css'}]]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
              configFile: tsConfigPath,
              compilerOptions: {
                target: 'es2015'
              }
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.module.less$/,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          styleLoader,
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: darkTheme.default
            },
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'https://g.alicdn.com/tao-ide/ide-front/0.0.8/fonts', //"http://localhost:8080/fonts"
          }
        }]
      }
    ],
  },
  resolveLoader: {
    modules: [path.resolve('node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      inject: false,
      templateParameters: {
        cdnBase: isDevelopment ? '' : `https://g.alicdn.com/tao-ide/ide-lite/0.0.3/`,
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new webpack.DefinePlugin({
      'process.env.DEVELOPMENT': JSON.stringify(!!isDevelopment),
      'process.env.SCM_PLATFORM': JSON.stringify(process.env.SCM_PLATFORM),
      'process.env.LSIF_HOST': JSON.stringify(process.env.LSIF_HOST),
      'process.env.PROJECT_ID': JSON.stringify(process.env.SCM_PLATFORM === 'aone' ? '1812048' : '122688')
    }),
    new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${port}`],
      },
      // onErrors: utils.createNotifierCallback(),
      clearConsole: true,
    }),
    new CopyPlugin([
      { from: path.join(__dirname, './src/vendor'), to: dir + '/dist' },
    ]),
  ],
  devServer: {
    contentBase: dir + '/dist',
    port,
    host: '127.0.0.1',
    https: protocol === 'https' ? {
      key: fs.readFileSync('/Users/louis/http-server-ssl/key.pem'),
      cert: fs.readFileSync('/Users/louis/http-server-ssl/cert.pem'),
    } : false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    overlay: true,
  }
}