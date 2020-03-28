// 传递参数解析

const uniqueParam = ['build', 'dev-server', 'watch', 'library'];  // 模式只能选择一种需要做合法性检测

module.exports = function paramResolve(param){
    const { mode, port, config } = param;
    const result = {};

    // 检测输入的 mode 是否合法，不合法则用 build 模式
    if ( mode && uniqueParam.includes(mode) ) {
        result.mode = mode;
    } else {
        result.mode = uniqueParam[0];
    }

    // 检测 port
    if(port) {
        result.port = port;
    } 

    if (config) {
        result.config = config;
    }
    if ( param.create ) {
        result.create = param.create;
    }
    return result;
}