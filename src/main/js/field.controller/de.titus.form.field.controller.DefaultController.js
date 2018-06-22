(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.field.controller.DefaultController", function() {
		var DefaultController = de.titus.form.field.controller.DefaultController = function(aElement) {
			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("constructor");

			this.element = aElement;
			this.input = undefined;
			this.type = undefined;
			this.filedata = undefined;
			this.timeoutId = undefined;
			this.data = {
				type : undefined
			};
			// setTimeout(DefaultController.prototype.__init.bind(this), 1);
			this.__init();
		};
		DefaultController.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.field.controller.DefaultController");

		DefaultController.prototype.valueChanged = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			de.titus.form.utils.EventUtils.triggerEvent(this.element, de.titus.form.Constants.EVENTS.FIELD_VALUE_CHANGED);
		};

		DefaultController.prototype.__init = function() {
			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("init()");

			if (this.element.find("select").length == 1) {
				this.type = "select";
				this.element.find("select").on("change", DefaultController.prototype.valueChanged.bind(this));
			} else {
				if (this.element.find("input[type='radio']").length > 0) {
					this.type = "radio";
					this.element.find("input[type='radio']").on("change", DefaultController.prototype.valueChanged.bind(this));
				} else if (this.element.find("input[type='checkbox']").length > 0) {
					this.type = "checkbox";
					this.element.find("input[type='checkbox']").on("change", DefaultController.prototype.valueChanged.bind(this));
				} else if (this.element.find("input[type='file']").length == 1) {
					this.type = "file";
					this.element.find("input[type='file']").on("change", DefaultController.prototype.readFileData.bind(this));
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

			de.titus.form.utils.EventUtils.handleEvent(this.element, de.titus.form.Constants.EVENTS.FIELD_SHOW, (function() {
				if (this.type == "select")
					this.element.find("select").prop("disabled", false);
				else
					this.element.find("input, textarea").prop("disabled", false);
			}).bind(this));

			de.titus.form.utils.EventUtils.handleEvent(this.element, de.titus.form.Constants.EVENTS.FIELD_SUMMARY, (function() {
				if (this.type == "select")
					this.element.find("select").prop("disabled", true);
				else
					this.element.find("input, textarea").prop("disabled", true);
			}).bind(this));

			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("init() -> detect type: " + this.type);
		};

		DefaultController.prototype.readFileData = function(aEvent) {
			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("readFileData()");

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
				reader.addEventListener("loadend", DefaultController.prototype.__fileReaded.bind(this, counter, reader, input.files[i], multiple), false);
				reader.readAsDataURL(input.files[i]);
				if (textField.length == 1)
					textField.val(textField.val() !== "" ? textField.val() + ", " + input.files[i].name : input.files[i].name);
			}
		};

		DefaultController.prototype.__fileReaded = function(aCounter, aReader, aFile, isMultible, aEvent) {
			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("readFileData() -> reader load event!");

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
				de.titus.form.utils.EventUtils.triggerEvent(this.element, de.titus.form.Constants.EVENTS.FIELD_VALUE_CHANGED);
		};

		DefaultController.prototype.getValue = function() {
			if (DefaultController.LOGGER.isDebugEnabled())
				DefaultController.LOGGER.logDebug("getValue()");
			var value;
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

		de.titus.form.Registry.registFieldController("default", function(aElement) {
			return new DefaultController(aElement);
		});
	});
})($);
