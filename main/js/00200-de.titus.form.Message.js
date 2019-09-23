(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Message", function() {
		var Message = de.titus.form.Message = function(aElement) {
			if (Message.LOGGER.isDebugEnabled())
				Message.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    dataContext : undefined,
			    expression : (aElement.attr("data-form-message") || "").trim(),
			    expressionResolver : new de.titus.core.ExpressionResolver(),
			    timeoutId : undefined
			};
			this.data.element.formular_utils_SetInactive();
			setTimeout(Message.prototype.__init.bind(this), 1);
			// this.__init();
		};

		Message.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Message");

		Message.prototype.__init = function() {
			if (Message.LOGGER.isDebugEnabled())
				Message.LOGGER.logDebug("__init()");

			if (this.data.expression !== "") {
				var element = this.data.element.formular_field_utils_getAssociatedStructurElement();
				this.data.dataContext = this.data.element.formular_findDataContext();
				de.titus.form.utils.EventUtils.handleEvent(element, [ EVENTTYPES.INITIALIZED, EVENTTYPES.FIELD_VALUE_CHANGED ], Message.prototype.__doMessage.bind(this));
			}
		};

		Message.prototype.__doMessage = function(aEvent) {
			if (this.data.timeoutId)
				clearTimeout(this.data.timeoutId);

			this.data.timeoutId = setTimeout(Message.prototype.__doCheck.bind(this, aEvent), 300);
		};

		Message.prototype.__doCheck = function(aEvent) {
			if (Message.LOGGER.isDebugEnabled())
				Message.LOGGER.logDebug([ "__doCheck(\"", aEvent, "\")" ]);

			var data = this.data.dataContext.getData({
			    condition : false,
			    validate : true
			});

			data = de.titus.form.data.utils.DataUtils.toModel(data, "object");
			if (Message.LOGGER.isDebugEnabled())
				Message.LOGGER.logDebug([ "__doCheck() -> data context: \"", data, "\", expression: \"", this.data.expression, "\"" ]);

			var result = this.data.expressionResolver.resolveExpression(this.data.expression, data, false);
			if (result)
				this.data.element.formular_utils_SetActive();
			else
				this.data.element.formular_utils_SetInactive();
		};

		de.titus.core.jquery.Components.asComponent("formular_Message", de.titus.form.Message);

		$.fn.formular_initMessages = function() {
			return this.find("[data-form-message]").formular_Message();
		};
	});
})($, de.titus.form.Constants.EVENTS);
