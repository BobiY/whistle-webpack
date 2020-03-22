// 获取入口文件
/**
 * 支持的入口文件为
 * 
 * __dirname + /src/index.*(js|ts|jsx|tsx)
 */
const glob = require('glob');
const path = require('path');

const singleEntry = () => {  // 查找单入口文件，如果不存在，按照多入口打包
    const files = glob.sync(path.join(process.cwd(), './src/index.@(js|jsx|ts|tsx)'));
    const handleFun = filepath => 'index';
    return generatorEntryFiles(files, handleFun);
}

const multipEntry = () => {
    const files = glob.sync(path.join(process.cwd(), '/src/**/index.@(js|jsx|ts|tsx)'));
    const handleFun = filepath => {
        const match = /(\w*)\/index.(js|jsx|ts|tsx)/
        return filepath.split("src/")[1] ? filepath.split("src/")[1].match(match)[1] : ''
    }
    return generatorEntryFiles(files, handleFun);
}

const generatorEntryFiles = (files, handleFun) => {
    const entry = {};
    files.forEach( item => {
        const entryName = handleFun(item);
        if ( entryName ) {
            entry[entryName] = item;
        }
    } );
    return entry;
}

module.exports = () => {
    return Object.keys(singleEntry()).length > 0 ? singleEntry() : multipEntry();
};