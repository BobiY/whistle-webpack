const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const OptimizeCsssasetswebpackplugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const prodConfig = {
    mode: 'production',
    plugins: [
        new OptimizeCsssasetswebpackplugin({ // 压缩 css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
    ],
    optimization: {
        splitChunks: {
            minimizer: [
                new TerserPlugin({ // 多实例压缩代码
                    parallel: 4
                })
            ],
        }
    }
}

module.exports = webpackMerge(baseConfig, prodConfig);