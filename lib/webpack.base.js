const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const singleEntry = require('../utils/entryOption');
const htmlPageCreate = require('../utils/htmlCreate');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MyPlugin = require('../plugins/html-webpack-plugin-add');
const entryFile = singleEntry();  // 解析入口文件
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, entryFile); // 根据入口文件生成相应的html文件
const workPath = process.cwd();

module.exports = {
    context: workPath,
    mode: 'production',
    entry:  entryFile,
    output: {
        path: path.join(workPath, 'dist'),
        filename: '[name]_[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: path.join(workPath, 'node_modules'),
                use: [
                    {
                        loader: 'thread-loader',  // 多进程多实例构建
                        options: {
                            workers: 3
                        }
                    },
                    {
                        loader: 'babel-loader',  // 解析 js 相关资源
                        options: {
                            presets: [
                                "@babel/preset-typescript",  // 解析 ts 语法
                                "@babel/preset-react", // 解析 jsx 语法
                            ]
                        }
                    }
                ]
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
                               require('autoprefixer') // 需要自行添加需要兼容的浏览器
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,  // 解析图片资源
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf)$/, // 解析字体文件
                use: [
                    'file-loader'
                ] 
            }
        ]
    },
    resolve: {
        alias: {
            react: path.join(workPath, '/node_modules/react/umd/react.production.min.js'),
        },
        // modules: [path.resolve(workPath, 'node_modules')],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less'],
        mainFields: ["main"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contentHash:8].css'
        }),
    ].concat(htmlPages),
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0, // 抽离的公共包的最小体积
            maxSize: 0,  // 抽离的公共包的最大体积
            minChunks: 1, // 代码最少引用次数，达到这次数才会被抽离
            maxAsyncRequests: 5, // 并行请求的异步资源个数
            maxInitialRequests: 9, // 同步请求的资源个数
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all' ,
                    name: 'venders'
                },
                commons: {
                    test: /(react|react-dom)/,
                    // test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all' ,
                    // minChunks: 1 // 设置最小引用次数为2

                }
            }
        }
    }
}