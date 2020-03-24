const path = require('path');
process.chdir(path.join(process.cwd(),'/example'))
describe('webpack config test case', () => {
    require('./unit/webpack-base-test');
});