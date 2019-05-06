const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require("./package.json");

module.exports = merge(common,{
    mode: 'production',
    output : {
	    filename : 'bundle-' + project.version + '.js',
        path : path.resolve(__dirname, 'dist')
    }
});
