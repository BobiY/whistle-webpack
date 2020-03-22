const path = require('path');
const singleEntry = require('../utils/entryOption');
const entryFile = singleEntry();
const workPath = process.cwd();
console.log()
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
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-typescript",  // 解析 ts 或 tsx 时使用
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
        ]
    },
}