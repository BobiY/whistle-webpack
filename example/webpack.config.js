
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(require('../lib/webpack.prod'));
// module.exports = require('../lib/webpack.base');