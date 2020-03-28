// whistle-webpack 配置文件
module.exports = {
    worker: true,  // 开启多进程打包
    proxy: {},  // 设置代理
    CNDConfig: [  // 如果存在 cdn 库，在这里配置你的 cdn
        {
            packName: 'react',
            cdn: 'https://unpkg.com/react@16/umd/react.development.js',
            exportVar: 'React'
        }
    ], 
    library: {
        name: 'firstPackage', // 库暴露出去的名字
        target: 'umd',  // 库使用的目标环境  遵循 webpack.output.libraryTarget
    },
    entry: "./src/index.js",  // 默认会读取 src/index.(js|ts|tsx|jsx) 作为入口文件，如果不是次路径，则需要自定义配置，配置遵循 webpack.entry 规则
    plugins: [],  // 额外的 插件配置
    extraLoader: [], // 额外的自定义 loader 配置,
    noWapper 
};

// css3 添加前缀功能需要自己新建 .browserslistrc 进行配置，也可执行 xxxx 命令生成 w2 提供的默认配置
// 使用 ts 时需要新建 tsconfig.json 文件进行配置，也可以执行 XXX 命令生成
// .babelrc 文件可以自定义，以添加自定义的 babel 的 presets 和 plugins， 也可以执行 xxx 命令自定义生成
