const { start } = require('make-webpack-config');

start({
    watch: true,
    cleanDist: true,
    appPath: process.cwd() + '/examples',
    resolve: {
        alias: {
            'nil-tree': __dirname + '/../src'
        }
    }
});