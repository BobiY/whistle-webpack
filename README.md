# whistle-webpack

### 安装
~~~
yarn add whistle-webpack -D
~~~

### 使用

**目录结构**

1. 单入口文件
~~~
src |  
    |-index.(js|jsx|ts|tsx)
~~~
如果想使用 `react`，需要自行安装 `react` 和 `react-dom`, 默认支持 react 编译

2. 多入口文件
~~~
src |
    |-index |
            |-index.js
    |-search|
            |-index.js
~~~ 

会自动读取`./src/index.(js|jsx|ts|tsx)` 或者 `./src/**/index.(js|jsx|ts|tsx)`
**命令行输入**

可以在命令行中直接使用
~~~
whistle-webpack --mode build
// 或者
whistle-webpack
~~~

### 关于模式

提供三种模式，分别如下：

- build 模式，用于生产环境的打包
- dev-server 模式，用于本地开发
- watch 模式，类似于 `webpack --watch`

以上三种模式，通过命令行参数指定
~~~
// 生产打包
whistle-webpack --mode build
// 或
whistle-webpack

// 本地开发
whistle-webpack --mode dev-server --port 3000
// 默认开发端口是 8080

// 监听模式
whistle-webpack --mode watck
~~~

### 自己的配置文件

如果想扩展包中包含的三种模式的配置文件，可以这样做

~~~
const webpackMerge = require('webpack-merge');
const baseConfig = require('whistle-webpack/lib/webpack.base'); // 基础配置

const devConfig = require('whistle-webpack/lib/webpack.dev'); // 开发阶段配置

const prodConfig = require('whistle-webpack/lib/webpack.prod'); // 生产阶段配置

const watchConfig = require('whistle-webpack/lib/webpack.watch'); // 本地监听模式配置

const selfConfig = {
    plugins: []
}

module.exports = webpackMerge(/任意模式的配置/， selfConfig);
~~~

接下来在命令行中输入

~~~
whistle-webpack --config ./self.webpack.config.js
~~~

