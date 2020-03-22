// 生成多入口或单入口文件的 html 文件
const path = require('path');

const singleEntryHtml = (htmlPlugin, filename) => {
    const pluginsOption = {
        template: path.join(process.cwd(), 'index.html'),
        filename: path.join(`${filename}.html`),
        chunks: [filename],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,  // 去掉空格
            preservwLineBreak: false,  // 去掉换行
            minifyCss: true,
            minifyJS: true,
            removeComments: false // 移除注释
        }
    }
    return new htmlPlugin(pluginsOption);
} 

module.exports = (htmlPlugin, filename) => {
    const htmlPagePlugins = [];
    if ( (typeof filename).toLowerCase() === 'string' ) {
        const singleFileName = path.relative(process.cwd()+'/src',filename).split(".")[0];
        return [singleEntryHtml(htmlPlugin, singleFileName, true)];
    }

    return Object.keys( filename ).map( item => {
        return singleEntryHtml(htmlPlugin, item)
    } );
}