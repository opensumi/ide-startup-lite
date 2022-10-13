const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const tsConfigPath = path.join(__dirname, './tsconfig.json');
const dir = path.resolve('.');
const port = 8081;

const isDevelopment =
  process.env['NODE_ENV'] === undefined ||
  process.env['NODE_ENV'] === 'development' ||
  process.env['NODE_ENV'] === 'dev';

const styleLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: dir + '/src/app',
  node: {
    net: 'empty',
    child_process: 'empty',
    path: 'empty',
    url: false,
    fs: 'empty',
    process: false,
    Buffer: false,
  },
  output: {
    path: dir + '/dist',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
    alias: {
      lodash: 'lodash-es',
      fs: 'browserfs/dist/shims/fs.js',
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
      bfsGlobal: require.resolve('browserfs'),
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
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    style: 'css',
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
              configFile: tsConfigPath,
              compilerOptions: {
                target: 'es2017',
              },
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
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'https://g.alicdn.com/tao-ide/ide-front/0.0.8/fonts', //"http://localhost:8080/fonts"
            },
          },
        ],
      },
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
        cdnBase: isDevelopment ? '' : '/ide-startup-lite/',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new webpack.DefinePlugin({
      'process.env': '"ENV_VAR_NOT_FOUND"',
      'process.env.DEVELOPMENT': JSON.stringify(!!isDevelopment),
      'process.env.EXTENSION_WORKER_HOST': JSON.stringify(
        process.env.GITHUB_WORKFLOW ? 'https://opensumi.github.io/ide-startup-lite/worker.host.js' : '',
      ),
    }),
    new webpack.ProvidePlugin({
      BrowserFS: 'bfsGlobal',
      process: 'processGlobal',
      Buffer: 'bufferGlobal',
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${port}`],
      },
      clearConsole: true,
    }),
  ],
  devServer: {
    contentBase: dir + '/dist',
    port,
    host: '127.0.0.1',
    hot: true,
    https: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    overlay: true,
  },
};
