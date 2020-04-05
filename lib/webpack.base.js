const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const singleEntry = require('../utils/entryOption');
const entryFile = singleEntry(); // 解析入口文件
const workPath = process.cwd();
module.exports = {
  mode: 'none',
  entry: entryFile,
  output: {
    path: path.join(workPath, 'dist'),
    filename: '[name]_[hash:8].js',
    // chunkFilename: '[name].[contenthash:8].async.js',  // 异步加载的模块名称
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        include: process.cwd(),
        use: [
          {
            loader: 'babel-loader', // 解析 js 相关资源
            options: {
              // 考虑把下面这两部分分离出去
              presets: [
                '@babel/preset-typescript', // 解析 ts 语法
                '@babel/preset-react', // 解析 jsx 语法
                '@babel/preset-env',  // 转换 const 箭头函数等语法
              ],
              plugins: [
                [
                  '@babel/plugin-transform-destructuring',
                  { loose: false }
                ],
                [
                  '@babel/plugin-proposal-decorators',
                  { legacy: true, loose: true }
                ],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-export-default-from',
                // 支持管道符操作，eg:https://github.com/tc39/proposal-pipeline-operator/
                ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
                // 支持 do 语句，eg：https://babeljs.io/docs/en/babel-plugin-proposal-do-expressions
                '@babel/plugin-proposal-do-expressions',
                // 支持 :: <===> bind 语法，eg:https://babeljs.io/docs/en/babel-plugin-proposal-function-bind
                // '@babel/plugin-proposal-function-bind',
                // 支持 polyfill 。eg:https://segmentfault.com/a/1190000021188054
                // polyfill 设置，需要用户自己配置，这会导致文件变大
                // [
                //   "@babel/plugin-transform-runtime",
                //   {
                //     // "absoluteRuntime": false,
                //     "corejs": 3,
                //     "useESModules": true,
                //     "version": require('@babel/runtime/package.json').version
                //   }
                // ]
              ]
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/, // 解析 css 相关资源
        exclude: path.join(workPath, 'node_modules'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'), // 需要自行添加需要兼容的浏览器
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/, // 解析图片资源
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {  // 添加图片打包配置
              limit: 10000,
              name: 'static/[name].[hash:8].[ext]',
              // require 图片的时候不用加 .default
              esModule: false,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'static/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            },
          }
        ],
      },
      {
        test: /\.svg$/, // 解析 svg 文件
        use: [
          {
            loader: 'file-loader',
            options:{
              name: 'static/[name].[hash:8].[ext]',
              esModule: false,
            }
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf)$/, // 解析字体文件
        use: [
          {
            loader: 'file-loader',
            options:{
              name: 'static/[name].[hash:8].[ext]',
              esModule: false,
            }
          },
        ],
      },
    ],
  },
  resolve: {
    // alias: { // 这里配置时注意 react 和 react-dom 环境的匹配
    //     react: path.join(workPath, '/node_modules/react/umd/react.production.min.js'),
    // },
    modules: ['node_modules', path.join(__dirname, "../node_modules")],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    mainFields: ['main', 'brower'],
    symlinks: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contentHash:8].css',
    }),
    new CleanWebpackPlugin(),
  ],
  // optimization: {
  //   // 考虑去除公共库的抽离，要不就是 vender
  //   splitChunks: {
  //     name: true,
  //     cacheGroups: {
  //       commons: {
  //         // test: /(react|react-dom)/,
  //         name: 'common',
  //         chunks: 'all',
  //         minChunks: 1 // 设置最小引用次数为2
  //       },
  //     },
  //   },
  // },
};
