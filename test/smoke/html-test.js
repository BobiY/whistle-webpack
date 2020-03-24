const glob = require('glob');
const path = require('path');
const workPath = process.cwd();
describe('test html page generated~', () => {
    it( 'should has html page~', done => {
        const files = glob.sync(path.join(workPath, '/dist/*.html'));
        // console.log(files);
        if ( files.length > 0 ) {
            done();
        } else {
            throw Error('no html page generated~')
        }
    } );
});