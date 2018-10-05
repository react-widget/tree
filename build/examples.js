const { start } = require('make-webpack-config');

start({
	watch: true,
	cleanDist: true,
    appPath: process.cwd() + '/examples'
});