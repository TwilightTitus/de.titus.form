(function($, CONSTANTS) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.StepPanel", function() {
		var StepPanel = de.titus.form.StepPanel = function(aElement) {
			if (StepPanel.LOGGER.isDebugEnabled())
				StepPanel.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    panelElement : aElement.find("[data-form-step-panel]"),
			    steps : [],
			    current : undefined
			};

			setTimeout(StepPanel.prototype.__init.bind(this), 1);
		};

		StepPanel.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.StepPanel");

		StepPanel.prototype.__init = function() {
			if (StepPanel.LOGGER.isDebugEnabled())
				StepPanel.LOGGER.logDebug("init()");

			var steps = [];
			var index = 0;
			this.data.panelElement.find("[data-form-step]").each(function() {
				var element = $(this);
				element.formular_utils_SetInactive();
				var step = {
				    index : index++,
				    id : element.attr("data-form-step").toLowerCase(),
				    element : element
				};
				steps.push(step);
			});

			this.data.steps = steps;

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ CONSTANTS.EVENTS.STATE_CHANGED, CONSTANTS.EVENTS.PAGE_CHANGED ], StepPanel.prototype.update.bind(this));
		};

		StepPanel.prototype.update = function(aEvent) {
			if (StepPanel.LOGGER.isDebugEnabled())
				StepPanel.LOGGER.logDebug("update() -> " + aEvent.type);

			var formular = this.data.element.Formular();
			var pageController = this.data.element.formular_PageController();
			var state = formular.data.state;
			var stepId = CONSTANTS.SPECIALSTEPS.START;

			if (state == CONSTANTS.STATE.INPUT && pageController.getCurrentPage())
				stepId = pageController.getCurrentPage().data.step;
			else if (state == CONSTANTS.STATE.SUMMARY)
				stepId = CONSTANTS.SPECIALSTEPS.SUMMARY;
			else if (state == CONSTANTS.STATE.SUBMITTED)
				stepId = CONSTANTS.SPECIALSTEPS.SUBMITTED;

			this.setStep(stepId);
		};

		StepPanel.prototype.setStep = function(aId) {
			if (StepPanel.LOGGER.isDebugEnabled())
				StepPanel.LOGGER.logDebug("setStep(\"" + aId + "\")");
			var step = this.getStep(aId);
			if (step !== undefined) {
				if (this.data.current) {
					this.data.current.element.formular_utils_SetInactive();
					this.data.element.removeClass("step-" + this.data.current.id);
				}
				this.data.current = step;
				this.data.current.element.formular_utils_SetActive();
				this.data.element.addClass("step-" + aId);
			}
		};

		StepPanel.prototype.getStep = function(aId) {
			if (StepPanel.LOGGER.isDebugEnabled())
				StepPanel.LOGGER.logDebug("getStep(\"" + aId + "\")");
			if (!aId)
				return;

			var id = aId.toLowerCase();
			for (var i = 0; i < this.data.steps.length; i++) {
				var step = this.data.steps[i];
				if (step.id == id)
					return step;
			}
		};

		de.titus.core.jquery.Components.asComponent("formular_StepPanel", de.titus.form.StepPanel);
	});

})($, de.titus.form.Constants);
