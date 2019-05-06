const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require("./package.json");

module.exports = merge(common, {
    mode : 'development',
    optimization : {
	    usedExports : true
    },
    devtool : 'source-map',
    devServer : {
        contentBase : './WebContent',
        hot : true,
        quiet : true,
        port : 80
    },
    output : {
	    filename : project.name + '.js',
        path : path.resolve(__dirname, 'dist')
    },
    plugins : [ new webpack.HotModuleReplacementPlugin() ]  
});
