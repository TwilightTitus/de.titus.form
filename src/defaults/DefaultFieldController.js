// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

//own dependencies
import Registry from "../Registry";
import Constants from "../Constants";
import DataContext from "../DataContext";
import EventUtils from "../utils/EventUtils";
import HtmlStateUtil from "../utils/HtmlStateUtils";
import FieldUtils from "../fields/FieldUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.defaults.DefaultFieldController");

const DefaultFieldController = function(aElement) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.element = aElement;
	this.input = undefined;
	this.type = undefined;
	this.filedata = undefined;
	this.timeoutId = undefined;
	this.data = {
		type : undefined
	};
	this.__init();
};

DefaultFieldController.prototype.valueChanged = function(aEvent) {
	aEvent.preventDefault();
	aEvent.stopPropagation();
	EventUtils.triggerEvent(this.element, Constants.EVENTS.FIELD_VALUE_CHANGED);
};

DefaultFieldController.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init()");

	if (this.element.find("select").length == 1) {
		this.type = "select";
		this.element.find("select").on("change", DefaultFieldController.prototype.valueChanged.bind(this));
	} else {
		if (this.element.find("input[type='radio']").length > 0) {
			this.type = "radio";
			this.element.find("input[type='radio']").on("change", DefaultFieldController.prototype.valueChanged.bind(this));
		} else if (this.element.find("input[type='checkbox']").length > 0) {
			this.type = "checkbox";
			this.element.find("input[type='checkbox']").on("change", DefaultFieldController.prototype.valueChanged.bind(this));
		} else if (this.element.find("input[type='file']").length == 1) {
			this.type = "file";
			this.element.find("input[type='file']").on("change", DefaultFieldController.prototype.readFileData.bind(this));
		} else {
			this.type = "text";
			this.element.find("input, textarea").on("keyup change", (function(aEvent) {
				if (this.timeoutId !== undefined) {
					window.clearTimeout(this.timeoutId);
				}

				this.timeoutId = window.setTimeout((function() {
					this.valueChanged(aEvent);
				}).bind(this), 300);

			}).bind(this));
		}

		this.data.type = this.type;
	}

	EventUtils.handleEvent(this.element, Constants.EVENTS.FIELD_SHOW, (function() {
		if (this.type == "select")
			this.element.find("select").prop("disabled", false);
		else
			this.element.find("input, textarea").prop("disabled", false);
	}).bind(this));

	EventUtils.handleEvent(this.element, Constants.EVENTS.FIELD_SUMMARY, (function() {
		if (this.type == "select")
			this.element.find("select").prop("disabled", true);
		else
			this.element.find("input, textarea").prop("disabled", true);
	}).bind(this));

	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init() -> detect type: " + this.type);
};

DefaultFieldController.prototype.readFileData = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("readFileData()");

	let input = aEvent.target;
	let multiple = input.files.length > 1;
	if (multiple)
		this.fileData = [];
	else
		this.fileData = undefined;

	let counter = {
		count : input.files.length
	};

	let textField = this.element.find("input[type='text'][readonly]");
	if (textField.length == 1)
		textField.val("");
	for (var i = 0; i < input.files.length; i++) {
		let reader = new FileReader();
		reader.addEventListener("loadend", DefaultFieldController.prototype.__fileReaded.bind(this, counter, reader, input.files[i], multiple), false);
		reader.readAsDataURL(input.files[i]);
		if (textField.length == 1)
			textField.val(textField.val() !== "" ? textField.val() + ", " + input.files[i].name : input.files[i].name);
	}
};

DefaultFieldController.prototype.__fileReaded = function(aCounter, aReader, aFile, isMultible, aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("readFileData() -> reader load event!");

	let file = {
	    name : aFile.name,
	    type : aFile.type,
	    size : aFile.size,
	    data : aReader.result
	};

	if (isMultible)
		this.fileData.push(file);
	else
		this.fileData = file;

	aCounter.count--;
	if (aCounter.count === 0)
		EventUtils.triggerEvent(this.element, Constants.EVENTS.FIELD_VALUE_CHANGED);
};

DefaultFieldController.prototype.getValue = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("getValue()");
	let value;
	if (this.type == "select") {
		value = this.element.find("select").val();
		if (value && value.length > 0)
			return value;
	} else if (this.type == "radio") {
		value = this.element.find("input:checked").val();
		if (value && value.trim() !== "")
			return value;
	} else if (this.type == "checkbox") {
		var values = [];
		this.element.find("input:checked").each(function() {
			var value = $(this).val();
			if (value && value.trim() !== "")
				values.push(value);
		});
		return values.length > 0 ? values : undefined;
	} else if (this.type == "file")
		return this.fileData;
	else {
		value = this.element.find("input, textarea").first().val();
		if (value && value.trim() !== "")
			return value;
	}
};

Registry.registFieldController("default", function(aElement) {
	return new DefaultFieldController(aElement);
});

export default DefaultFieldController;
