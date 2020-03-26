// 创建 router.js 文件 
const path = require('path');
const fs = require('fs');
const initFiles = new Map();
const exts = ['tsx', 'jsx'];
const componentString = com => {
    return `/* webpackChunkName: "${com.name}" */ "${com.filepath.replace(path.sep, "/")}"`;
};
const getChunkName = key => {
    // 单入口文件不能出现 index 作为入口文件名
    let name = path.basename(key).split(".")[0];
    if ( name === 'index' ) {
        name = path.basename(path.dirname(key));
    }
    return name;
}
module.exports = function createRouter (files, type) {
    if (type === 'init') {
        for (const key in files) {
            if (files.hasOwnProperty(key) && (key.includes("tsx") || key.includes("jsx"))) {
                initFiles.set(key, {
                    path:  "/" + path.dirname(path.relative(path.join(process.cwd(), 'src'), key)),
                    component: componentString({
                        name: getChunkName(key), 
                        filepath: "./" + path.relative(path.join(process.cwd(), 'src'), key).split(".")[0]
                    })
                });
            }
        }
    }
    if (type === 'create' && (files.includes("tsx") || files.includes("jsx"))) {
        initFiles.set(files, {
            path:  "/" + path.dirname(path.relative(path.join(process.cwd(), 'src'), files)),
            component: componentString({
                name: getChunkName(files), 
                filepath: "./" + path.relative(path.join(process.cwd(), 'src'), files).split(".")[0]
            })
        });
    }

    if ( type === 'delete' && (files.includes("tsx") || files.includes("jsx"))) {
        initFiles.delete(files)
    }
    try{
        fs.unlinkSync(path.join(process.cwd(), 'src', 'routers.ts'))
    }catch(e){
        console.log()
    }
    // 生成最终的模板文件
    const routers = [];
    initFiles.forEach( value => {
        routers.push(value)
    } );
    const fileString = `
        const routres = [
        
    `;
    fs.appendFileSync(path.join(process.cwd(), 'src', 'routers.ts'), fileString);
    routers.forEach( (value, index) => {
        fs.appendFileSync(path.join(process.cwd(), 'src', 'routers.ts'), `
            {
                path: "${value.path}",
                component: getComponent(import(${value.component}))
            },
        `);
    } )
    fs.appendFileSync(path.join(process.cwd(), 'src', 'routers.ts'), `
        ];
        export default routres;
    `);
    // fs.writeFileSync(path.join(process.cwd(), 'src', 'routers.ts'), fileString);
}