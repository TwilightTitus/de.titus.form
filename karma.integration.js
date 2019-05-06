const merge = require('webpack-merge');
const common = require('./karma.common.js');
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
	config.set(merge(common, {
		logLevel : config.LOG_INFO,
		browsers : [ 'ChromeHeadless' ],
		autoWatch : true,
		singleRun : true,
		concurrency : Infinity
	}))
}
