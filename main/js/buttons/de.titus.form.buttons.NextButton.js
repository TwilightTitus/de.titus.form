(function($, EVENTTYPES, aEventUtils) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.buttons.NextButton", function() {
		var NextButton = de.titus.form.buttons.NextButton = function(aElement) {
			if (NextButton.LOGGER.isDebugEnabled())
				NextButton.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formularElement : de.titus.form.utils.FormularUtils.getFormularElement(aElement)
			};

			setTimeout(NextButton.prototype.__init.bind(this), 1);
		};

		NextButton.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.buttons.NextButton");

		NextButton.prototype.__init = function() {
			if (NextButton.LOGGER.isDebugEnabled())
				NextButton.LOGGER.logDebug("__init()");

			aEventUtils.handleEvent(this.data.element, "click", NextButton.prototype.execute.bind(this));
			aEventUtils.handleEvent(this.data.formularElement, [ EVENTTYPES.PAGE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED, EVENTTYPES.CONDITION_STATE_CHANGED ], NextButton.prototype.update.bind(this));
			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		NextButton.prototype.execute = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.ACTION_PAGE_NEXT);
		};

		NextButton.prototype.update = function(aEvent) {
			if (NextButton.LOGGER.isDebugEnabled())
				NextButton.LOGGER.logDebug("update() -> " + aEvent.type);

			var pageController = this.data.formularElement.formular_PageController();
			var page = pageController.getCurrentPage();
			if (page && page.data.type == de.titus.form.Constants.TYPES.PAGE && page.data.condition && page.data.valid) {
				var nextPage = pageController.getNextPage();
				if (nextPage.data.type == de.titus.form.Constants.TYPES.PAGE) {
					this.data.element.formular_utils_SetActive();
					aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_ACTIVE);
					return;
				}
			}

			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		de.titus.core.jquery.Components.asComponent("formular_buttons_NextButton", de.titus.form.buttons.NextButton);
	});
})($, de.titus.form.Constants.EVENTS, de.titus.form.utils.EventUtils);
