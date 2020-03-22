// 获取入口文件
/**
 * 支持的入口文件为
 * 
 * __dirname + /src/index.*(js|ts|jsx|tsx)
 */
const glob = require('glob');
const path = require('path');
const singleEntry = () => {  // 查找单入口文件，如果不存在，按照多入口打包
    const files = glob.sync(path.join(process.cwd(), '/src/index.@(js|jsx|ts|tsx)'));
    // console.log(files)
    return files[0];
}

const multipEntry = () => {
    const files = glob.sync(path.join(process.cwd(), '/src/**/index.@(js|jsx|ts|tsx)'));
    const match = /(\w*)\/index.[js|jsx|ts|tsx]/;
    const entry = {};
    files.forEach( item => {
        const entryName = item.split("src/")[1] ? item.split("src/")[1].match(match)[1] : '';
        if ( entryName ) {
            entry[entryName] = item;
        }
    } );
    return entry;
}

module.exports = () => {
    return (singleEntry() || "").includes(".") ? singleEntry() : multipEntry();
};