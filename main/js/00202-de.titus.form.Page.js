(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Page", function() {
		var Page = de.titus.form.Page = function(aElement) {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formular : undefined,
			    dataContext : undefined,
			    type : de.titus.form.Constants.TYPES.PAGE,
			    name : aElement.attr("data-form-page"),
			    step : (aElement.attr("data-form-step") || "").trim(),
			    active : false,
			    condition : undefined,
			    valid : undefined,
			    fields : []
			};

			this.data.element.formular_DataContext({
			    data : Page.prototype.getData.bind(this),
			    scope : "$page"
			});
			setTimeout(Page.prototype.__init.bind(this), 1);
		};

		Page.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Page");

		Page.prototype.__init = function() {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug("init()");

			this.data.formular = de.titus.form.utils.FormularUtils.getFormular(this.data.element);
			this.data.dataContext = this.data.element.formular_findParentDataContext();

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET, EVENTTYPES.CONDITION_NOT_MET ], Page.prototype.__changeConditionState.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED ], Page.prototype.__changeValidationState.bind(this));

			this.data.fields = this.data.element.formular_field_utils_getSubFields();			
			this.data.element.formular_Condition();

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.PAGE_INITIALIZED);
		};

		Page.prototype.__changeConditionState = function(aEvent) {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug([ "__changeConditionState (\"", aEvent, "\") -> page: \"", this, "\"" ]);

			aEvent.preventDefault();
			aEvent.stopPropagation();

			var condition = false;
			if (aEvent.type == EVENTTYPES.CONDITION_MET)
				condition = true;

			if (this.data.condition != condition) {
				this.data.condition = condition;
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED);
			}
		};

		Page.prototype.__changeValidationState = function(aEvent) {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug([ "__changeValidationState (\"", aEvent, "\") -> page: \"", this, "\"" ]);

			aEvent.preventDefault();
			this.doValidate(true);			
		};

		Page.prototype.doValidate = function(force) {
			if (force) {
				var oldValid = this.data.valid;
				this.data.valid = de.titus.form.utils.FormularUtils.isFieldsValid(this.data.fields, force);
				if (oldValid != this.data.valid) {
					if (this.data.valid)
						this.data.element.formular_utils_SetValid();
					else
						this.data.element.formular_utils_SetInvalid();
					
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_STATE_CHANGED);
				}
			}

			return this.data.valid;
		};

		Page.prototype.hide = function() {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug("hide ()");
			this.data.active = false;
			this.data.element.formular_utils_SetInactive();

		};

		Page.prototype.show = function() {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug("show ()");

			if (this.data.condition) {
				this.data.element.formular_utils_SetActive();
				for (var i = 0; i < this.data.fields.length; i++)
					this.data.fields[i].show();

				this.data.active = true;
			}
		};

		Page.prototype.summary = function() {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug("summary ()");

			if (this.data.condition) {
				for (var i = 0; i < this.data.fields.length; i++)
					this.data.fields[i].summary();

				this.data.element.formular_utils_SetActive();
			}
		};

		Page.prototype.getData = function(aFilter) {
			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug([ "getData(\"", aFilter, "\") -> page: \"", this, "\"" ]);

			var result;
			if (aFilter.example)
				result = de.titus.form.utils.FormularUtils.toBaseModel(this.data.fields, aFilter);
			else if (this.data.active || (this.data.condition && this.data.valid))
				result = de.titus.form.utils.FormularUtils.toBaseModel(this.data.fields, aFilter);
			else
				return;

			if (Page.LOGGER.isDebugEnabled())
				Page.LOGGER.logDebug([ "getData() -> result: \"", result, "\"" ]);

			if (this.data.name)
				return {
				    name : this.data.name,
				    type : "container-field",
				    $type : "container-field",
				    value : result
				};
			else
				return result;
		};

		de.titus.core.jquery.Components.asComponent("formular_Page", de.titus.form.Page);
	});
})($, de.titus.form.Constants.EVENTS);
