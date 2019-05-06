const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require("./package.json");
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = merge(common,{
    mode: 'production',
    output : {
	    filename : project.name + '.min.js',
        path : path.resolve(__dirname, 'dist')
    }, plugins : [ new ReplaceInFileWebpackPlugin([ 
		{
	        dir : 'dist',
	        test : [ /\.js$/],
	        rules : [ {
	            search : /\$\{version\}/ig,
	            replace :  project.version
	        }]
		} 
	]) 
]
});
