(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Formular", function() {
		var Formular = de.titus.form.Formular = function(aElement) {
			if (Formular.LOGGER.isDebugEnabled())
				Formular.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    name : aElement.attr("data-form"),
			    state : de.titus.form.Constants.STATE.INPUT,
			    expressionResolver : new de.titus.core.ExpressionResolver()
			};

			this.data.element.formular_DataContext({
				data : Formular.prototype.getData.bind(this)
			});

			this.data.element.formular_utils_SetInitializing();
			setTimeout(Formular.prototype.__init.bind(this), 1);
		};

		Formular.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Formular");

		Formular.prototype.__init = function() {
			if (Formular.LOGGER.isDebugEnabled())
				Formular.LOGGER.logDebug("init()");

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.ACTION_SUBMIT ], Formular.prototype.submit.bind(this));

			this.data.element.formular_StepPanel();
			this.data.element.formular_FormularControls();
			this.data.element.formular_PageController();
			this.data.element.formular_initMessages();

			setTimeout((function() {
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
				this.data.element.formular_utils_SetInitialized();
			}).bind(this), 100);
		};

		Formular.prototype.getData = function(aFilter, aModel) {
			if (Formular.LOGGER.isDebugEnabled())
				Formular.LOGGER.logDebug([ "getData (\"", aFilter, "\", \"", aModel, "\")" ]);

			var result = {};
			var pages = this.data.element.formular_PageController().data.pages;
			for (var i = 0; i < pages.length; i++) {
				var data = pages[i].getData(aFilter);
				if (data)
					result = $.extend(result, data);
			}

			if (aModel)
				result = de.titus.form.data.utils.DataUtils.toModel(result, aModel);

			if (Formular.LOGGER.isDebugEnabled())
				Formular.LOGGER.logDebug([ "getData (\"", aFilter, "\", \"", aModel, "\") -> result: \"", result, "\"" ]);

			return result;
		};

		Formular.prototype.submit = function() {
			if (Formular.LOGGER.isDebugEnabled())
				Formular.LOGGER.logDebug("submit ()");

			try {
				console.log("object model: ");
				console.log(this.getData("object"));
				console.log("key-value model: ");
				console.log(this.getData("key-value"));
				console.log("list-model model: ");
				console.log(this.getData("list-model"));
				console.log("data-model model: ");
				console.log(this.getData("data-model"));

				this.data.state = de.titus.form.Constants.STATE.SUBMITTED;

				let hasError = false;
				let action = (this.data.element.attr("data-form-action") || "").trim();
				if (action.length > 0) {
					let result = this.data.expressionResolver.resolveExpression(action, {
						form : this
					});
					if (typeof result === "function")
						result = result(this);
					
					if(typeof result === "boolean")
						hasError = !result;
				}

				if (!hasError) {
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.STATE_CHANGED);
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.SUCCESSED);
				} else
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FAILED);
			} catch (e) {
				Formular.LOGGER.logError(e);
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FAILED);
			}
		};
	});

	de.titus.core.jquery.Components.asComponent("Formular", de.titus.form.Formular);

	$(document).ready(function() {
		$('[data-form]').Formular();
	});
})($, de.titus.form.Constants.EVENTS);
