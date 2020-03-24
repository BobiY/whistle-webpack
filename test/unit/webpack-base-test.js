const assert = require('chai').assert;
describe('base config test case', () => {
    const baseConfig = require('../../lib/webpack.base');
    it('entry case', () => {
        assert.equal(Object.keys(baseConfig.entry).length, 3, "entry ok");
        // done();
    });
});