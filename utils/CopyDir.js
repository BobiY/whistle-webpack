
const fs = require('fs');
const path = require('path');
const colors = require('colors');
class CopyDir {
    constructor(config) {
        this.copy = this.copy.bind(this);
        this.checkDirectory = this.checkDirectory.bind(this)
    }

    copy(src,dst) {
        let paths = fs.readdirSync(src); //同步读取当前目录
        paths.forEach(p => {
            const _src=path.join(src, p);
            const _dst=path.join(dst, p);
            // console.log(_src, _dst)
            fs.stat(_src, (err,stats) => {  //stats  该对象 包含文件属性
                if(err)throw err;
                if(stats.isFile()){ //如果是个文件则拷贝

                    // copy 文件打印提示信息
                    console.log(`${colors.green('Copy: ')} ${path.basename(_src)}`); 
                    let readable=fs.createReadStream(_src);//创建读取流
                    let writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(stats.isDirectory()){ //是目录则 递归 
                    console.log(`${colors.green('Create: ')} ${path.basename(_src)}`);
                    this.checkDirectory(_src,_dst,this.copy);
                }
            });
        });
    }

    /**
     * @param src 模板文件所在目录 
     * @param dst 复制到的文件目录
     * @param callback 执行的 copy 函数
     */
    checkDirectory(src, dst) {
        fs.access(dst, fs.constants.F_OK, (err) => {
            if(err){
                fs.mkdirSync(dst);
                console.log(`${colors.green('Copy: ')} ${file}`);
            }
            this.copy(src,dst);
        });
    }
}

module.exports = new CopyDir();