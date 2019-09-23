(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.fields.SingleField", function() {
		var Field = de.titus.form.fields.SingleField = function(aElement) {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    dataContext : undefined,
			    name : (aElement.attr("data-form-field") || "").trim(),
			    type : (aElement.attr("data-form-field-type") || "default").trim(),
			    required : (aElement.attr("data-form-required") !== undefined),
			    requiredOnActive : (aElement.attr("data-form-required") === "on-condition-true"),
			    condition : undefined,
			    valid : undefined,
			    controller : undefined
			};

			this.data.element.formular_DataContext({
			    data : Field.prototype.getData.bind(this),
			    scope : "$field"
			});
			this.hide();

			setTimeout(Field.prototype.__init.bind(this), 1);
		};

		Field.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.fields.SingleField");

		Field.prototype.__init = function() {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("init()");

			this.data.dataContext = this.data.element.formular_findParentDataContext();
			this.data.controller = de.titus.form.Registry.getFieldController(this.data.type, this.data.element);
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET, EVENTTYPES.CONDITION_NOT_MET ], Field.prototype.__changeConditionState.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.VALIDATION_VALID, EVENTTYPES.VALIDATION_INVALID ], Field.prototype.__changeValidationState.bind(this));

			this.data.element.formular_Condition();
			this.data.element.formular_Validation();

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
		};

		Field.prototype.__changeConditionState = function(aEvent) {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("__changeConditionState()  for \"" + this.data.name + "\" -> " + aEvent.type);

			aEvent.preventDefault();
			aEvent.stopPropagation();

			var condition = false;
			if (aEvent.type == EVENTTYPES.CONDITION_MET)
				condition = true;

			if (this.data.condition != condition) {
				this.data.condition = condition;
				if (this.data.condition)
					this.show();
				else
					this.hide();

				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED);
			}
		};

		Field.prototype.__changeValidationState = function(aEvent) {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug([ "__changeValidationState() for field \"", this.data.name, "\" -> ", aEvent.type, "; field: \"", this, "\"" ]);

			aEvent.preventDefault();
			aEvent.stopPropagation();

			var valid = aEvent.type == EVENTTYPES.VALIDATION_VALID;

			if (this.data.valid != valid) {
				if (Field.LOGGER.isDebugEnabled())
					Field.LOGGER.logDebug("__changeValidationState() for field \"" + this.data.name + "\" from " + this.data.valid + " -> " + valid);

				this.data.valid = valid;

				if (this.data.valid)
					this.data.element.formular_utils_SetValid();
				else
					this.data.element.formular_utils_SetInvalid();

				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_STATE_CHANGED);
			}

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALIDATED);
		};

		Field.prototype.doValidate = function(force) {
			if (force) {
				this.data.valid = this.data.element.formular_Validation().doValidate();
				if (this.data.valid)
					this.data.element.formular_utils_SetValid();
				else
					this.data.element.formular_utils_SetInvalid();
			}

			return this.data.valid;
		};

		Field.prototype.hide = function() {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("hide ()");

			this.data.element.formular_utils_SetInactive();
			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_HIDE);
		};

		Field.prototype.show = function() {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("show ()");
			if (this.data.condition) {
				this.data.element.formular_utils_SetActive();
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_SHOW);
			}
		};

		Field.prototype.summary = function() {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug("summary ()");
			if (this.data.condition) {
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_SUMMARY);
				this.data.element.formular_utils_SetActive();
			}
		};

		Field.prototype.getData = function(aFilter) {
			if (Field.LOGGER.isDebugEnabled())
				Field.LOGGER.logDebug([ "getData(\"", aFilter, "\")" ]);

			var result;
			if (aFilter.example)
				result = this.data.controller.getExample();
			else if (this.data.condition && (this.data.valid || aFilter.validate || aFilter.condition))
				result = this.data.controller.getValue();
			else
				return;

			return {
			    name : this.data.name,
			    type : this.data.controller.data.type ? this.data.controller.data.type : this.data.type,
			    $type : "single-field",
			    value : result
			};
		};
	});
})($, de.titus.form.Constants.EVENTS);
