const glob = require('glob');
const path = require('path');
const workPath = process.cwd();

describe('css js file generated test', () => {
    it('css and js files', done => {
        const files = glob.sync(path.join(workPath, '/dist/*.@(css|js)'));
        // console.log(files);
        if ( files.length > 0 ) {
            done();
        } else {
            throw Error('no js or css page generated~')
        }
    })
});