(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.FormularControls", function() {
		var FormularControls = de.titus.form.FormularControls = function(aElement) {
			if (FormularControls.LOGGER.isDebugEnabled())
				FormularControls.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement
			};

			this.init();
		};

		FormularControls.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.FormularControls");

		FormularControls.prototype.init = function() {
			if (FormularControls.LOGGER.isDebugEnabled())
				FormularControls.LOGGER.logDebug("init()");

			this.data.element.find("[data-form-button-reset]").formular_buttons_ResetButton();
			this.data.element.find("[data-form-button-back]").formular_buttons_BackButton();
			this.data.element.find("[data-form-button-next]").formular_buttons_NextButton();
			this.data.element.find("[data-form-button-summary]").formular_buttons_SummaryButton();
			this.data.element.find("[data-form-button-submit]").formular_buttons_SubmitButton();			
		};

		de.titus.core.jquery.Components.asComponent("formular_FormularControls", de.titus.form.FormularControls);
	});
})($,de.titus.form.Constants.EVENTS);
