/**
 * 其他可选的配置项
 * 1. 分离引用次数一定的函数或其他公共代码  实现
 * 2. 开启多进程打包。针对 js 和 css ，其他部分不予以添加 实现
 * 3. 各个模块的打包速度分析支持 实现
 * 4. 各个模块占最终打包体积分析 X
 * 5. 提供 .zip 包的支持  实现
 * 6. 提供网络代理能力  实现
 */
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

 exports.splitVander = {  // 分离公共 chunk 包
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000, // 抽离的公共包的最小体积
          // maxSize: 0, // 抽离的公共包的最大体积
          minChunks: 3, // 代码最少引用次数，达到这次数才会被抽离
          maxAsyncRequests: 5, // 并行请求的异步资源个数
          maxInitialRequests: 9, // 同步请求的资源个数
          automaticNameDelimiter: '~',
        }
    },
}

// 各个模块速度分析
exports.speedMeasure = function(config) {
    const smp = new SpeedMeasurePlugin();
    return smp.wrap(config)
}


// 启动多进程打包
exports.moreWorker = function(webpackConfig, workerConfig) {
    /**
     * worker: {
     *    js: {
     *      worker: 2, // 产生的 worker 的数量，默认是 cpu 的核心数  
     *      workerParallelJobs: 50, // 一个 worker 进程中并行执行工作的数量 默认是 20
     *      poolTimeout： 50， //
     *    },
     *    css: {
     *      worker: 2, // 产生的 worker 的数量，默认是 cpu 的核心数
     *    }
     * }
     * 更相信的配置参见 webpack -> [thread-loader](https://www.webpackjs.com/loaders/thread-loader/)
     * or
     * 
     * worker: true  开启多进程打包，全部使用默认参数设置
     *  
     *
     */
    function getThreadLoder(webpackConfig,workerConfig) {
        if ( (typeof workerConfig.worker).toLowerCase() === 'boolean' ) {
            return {
                jsConfig: {
                    loader: 'thread-loder'
                },
                cssConfig: {
                    loader: 'thread-loader'
                }
            }
        }
    
        return {
            jsConfig: {
                loader: 'thread-loder',
                options: webpackConfig.worker.js || {}
            },
            cssConfig: {
                loader: 'thread-loader',
                options: webpackConfig.worker.css || {}
            }
        }
    }

    const result = getThreadLoder(webpackConfig, workerConfig);
    const jsConfig = webpackConfig.module.rules[0];
    jsConfig.use = [result.jsConfig, ...jsConfig.use];
    const cssConfig = webpackConfig.module.rules[1];
    cssConfig.use = [cssConfig[0], result.cssConfig, ...cssConfig.slice(1)];
    return webpackConfig;
}