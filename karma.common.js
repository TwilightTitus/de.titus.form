const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

module.exports = {
	// base path that will be used to resolve all patterns (eg. files,
	// exclude)
	basePath : "",
	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks : [ "jasmine" ],
	// list of files / patterns to load in the browser
	files : ["src/**/*.js", "test/index.js", "test/sites/**/*.html" ],
	// list of files / patterns to exclude
	exclude : [],
	// available preprocessors:
	// https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors : {
		"src/**/*.js" : [ "webpack", "coverage"],
		"test/*.js" : [ "webpack", "sourcemap"],
		"test/sites/**/*.html" : [ "html2js" ]
	},
	webpack :  merge(webpackCommon, {
		mode : "development",
		devtool : "inline-source-map"
	}),
	// test results reporter to use
	// possible values: "dots", "progress"
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	reporters : ["progress", "coverage"],
	coverageReporter : {
		dir : 'coverage/',
		reporters : [
			{ type: 'html', subdir: 'report-html' },
			{ type: 'lcov', subdir: 'report-lcov' },
			{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
			{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
			{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
			{ type: 'text', subdir: '.', file: 'text.txt' },
			{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
		]
	},
	port : 9876,
	colors : true,
	autoWatch : true,
	client : {
		clearContext : true
	},
	singleRun : false,
	concurrency : Infinity
// browserNoActivityTimeout: 60000
};
