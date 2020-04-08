// 检测入口文件并且根据参数返回对应打包配置
const colors = require('colors');
class CheckEntry {
    // 如果没有传入 mode，则需要给与一些帮助提示信息
    someTipInfo() {
        console.log(`你需要选择
                ${colors.green('dev')},
                ${colors.green('build')},
                ${colors.green('watch')},
                ${colors.green('library')},
                其中的一种模式，或者输入
                ${colors.green('whistle-webpack help')}
                获取更多帮助信息
            `);
    }
    // 根据传入的模式取配置
    getModeConfig(mode) {
        if( !mode ) {
            this.someTipInfo();
            return false; // 返回 false 表示传的 mode 为空
        }
        switch(mode) {
            case 'dev':
                return require('../../lib/webpack.dev');
            case 'build':
                return require('../../lib/webpack.prod');
            case 'watch':
                return require('../../lib/webpack.watch');
            case 'library':
                return require('../../lib/webpack.bundle');
            default:
                return require('../../lib/webpack.base');
        }
    }

    checkEntryOption(entryOption) {
        // 入口会处理成一个对象
        if( (typeof entryOption).toLocaleLowerCase() === "object" ) {
            if( Object.keys(entryOption).length === 0 ) {
                console.log(colors.red('entry point can not empty ~'));
                return false;
            }
            return true;
        }
        return false;
    }

    // 获取传入模式配置和入口文件检测结果
    checkModeAndEntry(entryOption, mode) {
        // config 是对应模式的 webpack 的配置
        // entryResult 是检测入口文件是否为空的结果
        return {
            config: this.getModeConfig(mode),
            entryResult: this.checkEntryOption(entryOption)
        }
    }

}

module.exports = new CheckEntry();