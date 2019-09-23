import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

const configs = [
	{"filter": "", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender"]},
	{"filter": "de.titus.form.Form", "logLevel": "DEBUG", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.utils.EventUtils", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.StepPanel", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.Page", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.Condition", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.ValidationController", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.buttons", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]},
	{"filter": "de.titus.form.DataContext", "logLevel": "ERROR", "appenders":["de.titus.logging.MemoryAppender", "de.titus.logging.ConsolenAppender"]}
];


LoggerFactory.setConfig(configs);