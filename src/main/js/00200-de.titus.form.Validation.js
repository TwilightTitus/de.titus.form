(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Validation", function() {
		var Validation = de.titus.form.Validation = function(aElement) {
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug("constructor");

			var validations = aElement.find("[data-form-validation]").formular_ValidationExpression();
			this.data = {
			    element : aElement,
			    formular : undefined,
			    dataContext : undefined,
			    field : undefined,
			    expressionResolver : new de.titus.core.ExpressionResolver(),
			    validations : Array.isArray(validations) ? validations : validations ? [ validations ] : undefined,
			    timeoutId : undefined
			};

			setTimeout(Validation.prototype.__init.bind(this), 1);
		};

		Validation.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Validation");

		Validation.prototype.__init = function() {
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug("__init()");

			this.data.field = this.data.element.formular_field_utils_getAssociatedField();
			this.data.dataContext = this.data.element.formular_findDataContext();

			if (this.data.field.data.required || (this.data.validations && this.data.validations.length > 0)) {
				var formularElement = de.titus.form.utils.FormularUtils.getFormularElement(this.data.element);
				de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.INITIALIZED, EVENTTYPES.FIELD_VALUE_CHANGED ], Validation.prototype.__doLazyValidate.bind(this));
				de.titus.form.utils.EventUtils.handleEvent(formularElement, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED ], Validation.prototype.__doLazyValidate.bind(this));
			} else {
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_VALID);
				de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.INITIALIZED, EVENTTYPES.FIELD_VALUE_CHANGED ], (function() {
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_VALID);
				}).bind(this));
			}
		};

		Validation.prototype.__doLazyValidate = function(aEvent) {
			if (this.data.timeoutId)
				clearTimeout(this.data.timeoutId);

			this.data.timeoutId = setTimeout(Validation.prototype.__handleEvent.bind(this, aEvent), 300);
		};

		Validation.prototype.__handleEvent = function(aEvent) {
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug([ "__handleEvent(\"", aEvent, "\")" ]);

			aEvent.preventDefault();

			if (aEvent.type != EVENTTYPES.INITIALIZED && aEvent.type != EVENTTYPES.FIELD_VALUE_CHANGED)
				aEvent.stopPropagation();

			if (aEvent.currentTarget == this.data.element && aEvent.Type == EVENTTYPES.VALIDATION_STATE_CHANGED)
				return;

			if (this.doValidate())
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_VALID);
			else
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_INVALID);
		};

		Validation.prototype.doValidate = function() {
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug("doValidate()");

			this.data.element.find("[data-form-validation]").formular_utils_SetInactive();

			if(typeof this.data.field === "undefined")
				return false;
			
			var fieldData = this.data.field.getData({
			    condition : false,
			    validate : true
			});
			var hasValue = !this.__valueEmpty(fieldData);

			if (hasValue)
				this.data.element.removeClass("no-value");
			else
				this.data.element.addClass("no-value");

			var condition = this.data.field.data.condition;
			var required = this.data.field.data.required;
			var requiredOnActive = this.data.field.data.requiredOnActive;
			var hasValidations = this.data.validations && this.data.validations.length > 0;

			if (!condition && (requiredOnActive || !required))
				return true;
			else if (required && !hasValue)
				return false;
			else if (hasValue && hasValidations)
				return this.__checkValidations(fieldData);
			else
				return true;
		};

		Validation.prototype.__checkValidations = function(aFieldData) {
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug([ "__checkValidation(\"", aFieldData, "\")" ]);

			var data = this.data.dataContext.getData({
			    condition : false,
			    validate : true
			});
			data.$value = aFieldData ? aFieldData.value : undefined;

			data = de.titus.form.data.utils.DataUtils.toModel(data, "object");
			if (Validation.LOGGER.isDebugEnabled())
				Validation.LOGGER.logDebug([ "__checkValidation() -> dataContext: \"", data, "\"" ]);

			for (var i = 0; i < this.data.validations.length; i++) {
				var validation = this.data.validations[i];
				if (!validation.doValidate(data)) {
					validation.data.element.formular_utils_SetActive();
					return false;
				}
			}
			return true;
		};

		Validation.prototype.__valueEmpty = function(aFieldData) {
			return aFieldData === undefined || aFieldData.value === undefined || (Array.isArray(aFieldData.value) && aFieldData.value.length === 0) || (typeof aFieldData.value === "string" && aFieldData.value.trim().length === 0);
		};

		de.titus.core.jquery.Components.asComponent("formular_Validation", de.titus.form.Validation);
	});
})($, de.titus.form.Constants.EVENTS);
