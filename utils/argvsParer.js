console.log(process.argv);
console.log(process.argv.slice(2));  // 获取命令行参数

// 接收的合法参数
const cli = [
    'dev',
    'build',
    'watch',
    'library',
    'create app',
    'help'  // 待实现功能
];
// 命令行参数解析 
class ArgvParer {
    constructor() {
        this.argvs = [];
        this.parer();
        this.helpCli();
    }
    getAllArgs() { // 获取所有命令行参数

    }
    parer() {
        this.argvs = process.argv.slice(2);
    }
    getMode() {
        return this.argvs[0] || 'build'; // 默认是构建模式，只接受一种模式
    }
    checkArgv() {
        if ( this.argvs.length < 2 ) {
            this.argvs.push("");
        };
        const modeCheck = this.argvs.slice(0,2).join(" ");
        if (!cli.includes(modeCheck)) {
            console.log(`无法解析参数 ${modeCheck},请输入 help 来查看可用命令`)
            return false;
        }

    }
    helpCli() {
        console.log(`Usage: whistle-webpack [options]\n`);
        console.log('Options:');
        console.log(`dev         开发时使用此命令`);
        console.log(`build       构建打包时使用此命令`);
        console.log(`watch       简单的本地开发监听模式`);
        console.log(`library     想打包一个库时使用此命令`);
        console.log(`create app  创建一个使用 react + ts 环境的简单目录`);
    }
}

module.exports = new ArgvParer();