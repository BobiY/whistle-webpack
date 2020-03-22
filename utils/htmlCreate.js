// 生成多入口或单入口文件的 html 文件
const path = require('path');

const singleEntryHtml = (htmlPlugin, filename) => {
    return new htmlPlugin({
        template: path.join(process.cwd(), 'index.html'),
        filename: `${filename}.html`,
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
    });
} 

module.exports = (htmlPlugin, filename) => {
    const htmlPagePlugins = [];
    if ( (typeof filename).toLowerCase() === 'string' ) {
        return [singleEntryHtml(htmlPlugin, filename)];
    }

    return Object.keys( filename ).map( item => {
        return singleEntryHtml(htmlPlugin, item)
    } );
}