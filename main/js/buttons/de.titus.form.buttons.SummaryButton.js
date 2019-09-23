(function($, EVENTTYPES, aEventUtils) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.buttons.SummaryButton", function() {
		var SummaryButton = de.titus.form.buttons.SummaryButton = function(aElement) {
			if (SummaryButton.LOGGER.isDebugEnabled())
				SummaryButton.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formularElement : de.titus.form.utils.FormularUtils.getFormularElement(aElement)
			};

			setTimeout(SummaryButton.prototype.__init.bind(this), 1);
		};

		SummaryButton.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.buttons.SummaryButton");

		SummaryButton.prototype.__init = function() {
			if (SummaryButton.LOGGER.isDebugEnabled())
				SummaryButton.LOGGER.logDebug("__init()");

			aEventUtils.handleEvent(this.data.element, "click", SummaryButton.prototype.execute.bind(this));
			aEventUtils.handleEvent(this.data.formularElement, [ EVENTTYPES.PAGE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED, EVENTTYPES.CONDITION_STATE_CHANGED ], SummaryButton.prototype.update.bind(this));
			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		SummaryButton.prototype.execute = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.ACTION_SUMMARY);
		};

		SummaryButton.prototype.update = function(aEvent) {
			if (SummaryButton.LOGGER.isDebugEnabled())
				SummaryButton.LOGGER.logDebug("update() -> " + aEvent.type);

			var pageController = this.data.formularElement.formular_PageController();
			var page = pageController.getCurrentPage();
			if (page && page.data.condition && page.data.valid) {
				var nextPage = pageController.getNextPage();
				if (nextPage.data.type == de.titus.form.Constants.TYPES.SUMMARY_PAGE) {
					this.data.element.formular_utils_SetActive();
					aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_ACTIVE);
					return;
				}
			}
			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		de.titus.core.jquery.Components.asComponent("formular_buttons_SummaryButton", de.titus.form.buttons.SummaryButton);
	});
})($, de.titus.form.Constants.EVENTS, de.titus.form.utils.EventUtils);
