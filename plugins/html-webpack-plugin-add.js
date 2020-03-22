// If your plugin is direct dependent to the html webpack plugin:
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
// const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');
const fs = require('fs');
function MyPlugin(htmlWebpackPlugin) {
    console.log(htmlWebpackPlugin);
}

MyPlugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...')
        console.log("compilation.asserts", compilation.assets  );
        compilation.plugin('html-webpack-plugin-after-html-processing', (htmlData,callback) => {
            console.log(htmlData)
            callback(null, htmlData)
          });;
      // Static Plugin interface |compilation |HOOK NAME | register listener 
    //   new HtmlWebpackPlugin().getHooks(compilation).beforeEmit.tapAsync(
    //     'MyPlugin', // <-- Set a meaningful name here for stacktraces
    //     (data, cb) => {
    //       // Manipulate the content
    //       console.log(data)
    //     //   data.html += 'The Magic Footer'
    //       // Tell webpack to move on
    //       cb(null, data)
    //     }
    //   )
    })
  }

// class MyPlugin {
//     constructor(htmlWebpackPlugin) {
//         console.log(htmlWebpackPlugin)
//     }
//   apply (compiler) {
//     compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
//       console.log('The compiler is starting a new compilation...')
//         // console.log("compilation.asserts", compilation.assets  );
//         compilation.hooks
//         .optimizeChunkAssets
//         .tapAsync('MyPlugin', (chunks, callback) => {
//             chunks.forEach(chunk => {
//                 chunk.files.forEach(file => {
//                     fs.readFile()
//                 });
//             });
//             callback();
//         });
//       // Static Plugin interface |compilation |HOOK NAME | register listener 
//     //   new HtmlWebpackPlugin().getHooks(compilation).beforeEmit.tapAsync(
//     //     'MyPlugin', // <-- Set a meaningful name here for stacktraces
//     //     (data, cb) => {
//     //       // Manipulate the content
//     //       console.log(data)
//     //     //   data.html += 'The Magic Footer'
//     //       // Tell webpack to move on
//     //       cb(null, data)
//     //     }
//     //   )
//     })
//   }
// }

module.exports = MyPlugin