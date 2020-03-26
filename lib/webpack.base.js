const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const singleEntry = require('../utils/entryOption');
const htmlPageCreate = require('../utils/htmlCreate');
const TerserPlugin = require('terser-webpack-plugin');
const entryFile = singleEntry(); // 解析入口文件
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, entryFile); // 根据入口文件生成相应的html文件
const workPath = process.cwd();

module.exports = {
  mode: 'production',
  entry: entryFile,
  output: {
    path: path.join(workPath, 'dist'),
    filename: '[name]_[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'thread-loader', // 多进程多实例构建
          //   // options: {
          //   //   workers: 3,
          //   // },
          // },
          {
            loader: 'babel-loader', // 解析 js 相关资源
            options: {
              presets: [
                '@babel/preset-typescript', // 解析 ts 语法
                '@babel/preset-react', // 解析 jsx 语法
              ],
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
        test: /\.(png|svg|jpg|gif)$/, // 解析图片资源
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf)$/, // 解析字体文件
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    // alias: { // 这里配置时注意 react 和 react-dom 环境的匹配
    //     react: path.join(workPath, '/node_modules/react/umd/react.production.min.js'),
    // },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less'],
    mainFields: ['main', 'brower'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contentHash:8].css',
    }),
    new CleanWebpackPlugin(),
  ].concat(htmlPages),
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'common',
          chunks: 'all',
          minChunks: 1 // 设置最小引用次数为2

        },
      },
    },
  },
};
