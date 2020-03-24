const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
})
// 修改工作目录到 example
process.chdir(path.resolve(__dirname, "../../", "./example"));

rimraf("./dist", () => {
    const prodConfig = require('../../lib/webpack.prod');

    // 测试编译是否能成功
    webpack(prodConfig, (err, stats) => {
        if(err){
            console.err(err);
            process.exit(2);
        }

        console.log(stats.toString({
            color: true,
            modules: false,
            children: false
        }));

        mocha.addFile(path.join(__dirname, '/html-test.js'));
        mocha.addFile(path.join(__dirname, '/css-js-test.js'));
        mocha.run();
    })
});