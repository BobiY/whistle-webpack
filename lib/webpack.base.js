const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const singleEntry = require('../utils/entryOption');
const htmlPageCreate = require('../utils/htmlCreate');

const entryFile = singleEntry();  // 解析入口文件
const htmlPages = htmlPageCreate(HtmlWebpackPlugin, entryFile); // 根据入口文件生成相应的html文件
const workPath = process.cwd();
module.exports = {
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
                use: [
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contentHash:8].css'
        })
    ].concat(htmlPages)
}