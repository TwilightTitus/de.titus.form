/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Frank Schüler
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function(){
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Setup", function(){
		de.titus.form.Setup = {
			fieldtypes : {}
		};
	});	
})();(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Constants", function() {
		de.titus.form.Constants.TYPES = {
		    PAGE : "page",
		    SUMMARY_PAGE : "summary-page",
		    SUBMITTED_PAGE : "submitted-page"
		};

		de.titus.form.Constants.EVENTS = {
		    INITIALIZED : "form-initialized",
		    SUCCESSED : "form-successed",
		    FAILED : "form-failed",
		    STATE_CHANGED : "form-state-changed",

		    ACTION_RESET : "form-action-reset",
		    ACTION_SUBMIT : "form-action-submit",
		    ACTION_PAGE_BACK : "form-action-page-back",
		    ACTION_PAGE_NEXT : "form-action-page-next",
		    ACTION_SUMMARY : "form-action-page-summary",
		    ACTION_LIST_FIELD_ADD : "form-action-list-field-add",
		    ACTION_LIST_FIELD_REMOVE : "form-action-list-field-remove",

		    PAGE_INITIALIZED : "form-page-initialized",
		    PAGE_CHANGED : "form-page-changed",
		    PAGE_SHOW : "form-page-show",
		    PAGE_HIDE : "form-page-hide",
		    PAGE_SUMMARY : "form-page-summary",
		    PAGE_SUBMITTED : "form-page-submitted",

		    FIELD_VALIDATED : "form-field-validated",
		    FIELD_SHOW : "form-field-show",
		    FIELD_HIDE : "form-field-hide",
		    FIELD_SUMMARY : "form-field-SUMMARY",
		    FIELD_VALUE_CHANGED : "form-field-value-changed",

		    VALIDATION_STATE_CHANGED : "form-validation-state-changed",
		    VALIDATION_VALID : "form-validation-valid",
		    VALIDATION_INVALID : "form-validation-invalid",

		    CONDITION_STATE_CHANGED : "form-condition-state-changed",
		    CONDITION_MET : "form-condition-met",
		    CONDITION_NOT_MET : "form-condition-not-met",

		    BUTTON_INACTIVE : "form-button-inactive",
		    BUTTON_ACTIVE : "form-button-active",
		};

		de.titus.form.Constants.STATE = {
		    INPUT : "form-state-input",
		    SUBMITTED : "form-state-submitted",
		};

		de.titus.form.Constants.ATTRIBUTE = {
		    VALIDATION : "-validation",
		    VALIDATION_FAIL_ACTION : "-validation-fail-action",
		    CONDITION : "-condition",
		    MESSAGE : "-message"
		};

		de.titus.form.Constants.SPECIALSTEPS = {
		    START : "form-step-start",
		    SUMMARY : "form-step-summary",
		    SUBMITTED : "form-step-submitted"
		};

		de.titus.form.Constants.STRUCTURELEMENTS = {
		    FORM : {
			    selector : "[data-form]"
		    },
		    PAGE : {
			    selector : "[data-form-page]"
		    },
		    SINGLEFIELD : {
			    selector : "[data-form-field]"
		    },
		    CONTAINERFIELD : {
			    selector : "[data-form-container-field]"
		    },
		    LISTFIELD : {
			    selector : "[data-form-list-field]"
		    },
		};

	});
})();
(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Registry", function() {
		var Registry = de.titus.form.Registry = {
			LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Registry"),
			FIELDCONTROLLER : {},
			registFieldController : function(aTypename, aFunction) {
				if(Registry.LOGGER.isDebugEnabled())
					Registry.LOGGER.logDebug("registFieldController (\"" + aTypename + "\")");
				
				Registry.FIELDCONTROLLER[aTypename] = aFunction;
			},
			getFieldController : function(aTypename, aElement){
				if(Registry.LOGGER.isDebugEnabled())
					Registry.LOGGER.logDebug("getFieldController (\"" + aTypename + "\")");
				
				var initFunction = Registry.FIELDCONTROLLER[aTypename];	
				if(initFunction)
					return initFunction(aElement);
				else
					return Registry.FIELDCONTROLLER["default"](aElement);
			}
		};
	});
})();
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.EventUtils", function() {
		var EventUtils = de.titus.form.utils.EventUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.utils.EventUtils"),
		    triggerEvent : function(aElement, aEvent, aData) {
			    if (EventUtils.LOGGER.isDebugEnabled())
				    EventUtils.LOGGER.logDebug("triggerEvent(\"" + aEvent + "\")");

			    EventUtils.__checkOfUndefined(aEvent);

			    setTimeout((function(aEvent, aData) {
				    if (EventUtils.LOGGER.isDebugEnabled())
					    EventUtils.LOGGER.logDebug([ "fire event event \"", aEvent, "\"\non ", this, "\nwith data \"" + aData + "\"!" ]);
				    this.trigger(aEvent, aData);
			    }).bind(aElement, aEvent, aData), 1);
		    },
		    handleEvent : function(aElement, aEvent, aCallback, aSelector) {
			    // TODO REFECTORING TO ONE SETTINGS PARAMETER OBJECT

			    if (EventUtils.LOGGER.isDebugEnabled())
				    EventUtils.LOGGER.logDebug([ "handleEvent \"", aEvent, "\"\nat ", aElement, "\nwith selector ", aSelector ]);

			    EventUtils.__checkOfUndefined(aEvent);

			    if (Array.isArray(aEvent))
				    aElement.on(aEvent.join(" "), aSelector, aCallback);
			    else
				    aElement.on(aEvent, aSelector, aCallback);
		    },
		    __checkOfUndefined : function(aValue) {
			    if (Array.isArray(aValue))
				    for (var i = 0; i < aValue.length; i++)
					    if (aValue[i] === undefined)
						    throw new Error("Error: undefined value at array index \"" + i + "\"");
					    else if (aValue === undefined)
						    throw new Error("Error: undefined value");
		    }

		};
	});

})($);
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.FormularUtils", function() {
		var FormularUtils = de.titus.form.utils.FormularUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.utils.FormularUtils"),

		    getFormularElement : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getFormularElement()");

			    if (aElement.is("[data-form]"))
				    return aElement;
			    else
				    return aElement.parents("[data-form]").first();
		    },
		    getFormular : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getFormular()");

			    var formularElement = FormularUtils.getFormularElement(aElement);
			    if (formularElement)
				    return formularElement.Formular();
		    },

		    getPage : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getPage()");

			    if (aElement.is("[data-form]"))
				    return undefined;
			    else if (aElement.is("[data-form-page]"))
				    return aElement.formular_Page();
			    else {
				    var parent = aElement.parents("[data-form-page]").first();
				    if (parent.length == 1)
					    return parent.formular_Page();
			    }
		    },
		    getField : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getField()");
			    if (aElement.is("[data-form]"))
				    return undefined;
			    else if (aElement.is("[data-form-field]"))
				    return aElement.formular_Field();
			    else {
				    var parent = aElement.parents("[data-form-field]").first();
				    if (parent.length == 1)
					    return parent.formular_Field();
			    }
		    },

		    isFieldsValid : function(theFields, force) {
			    if (typeof theFields !== 'undefined' && theFields.length > 0) {
				    for (var i = 0; i < theFields.length; i++) {
					    var field = theFields[i];
					    var valid = force ? field.doValidate(force) : field.data.valid;
					    if (!valid)
						    return false;
				    }
			    }

			    return true;
		    },

		    toBaseModel : function(theFields, aFilter, aContainer) {
			    var result = aContainer || {};
			    for (var i = 0; i < theFields.length; i++) {
				    var data = theFields[i].getData(aFilter);
				    if (Array.isArray(data))
					    FormularUtils.toBaseModel(data, result);
				    else if (data && data.value)
					    result[data.name] = data;
			    }
			    return result;
		    }
		};
	});

})($);
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.JQueryFunctions", function() {

		var CONSTANTS = de.titus.form.utils.JQueryFunctions = {};
		CONSTANTS.ASSOCIATEDELEMENTSELECTOR = (function(ELEMENTS) {
			var selectors = [];
			for ( var name in ELEMENTS)
				if (ELEMENTS[name].selector)
					selectors.push(ELEMENTS[name].selector);

			return selectors.join(", ");
		}(de.titus.form.Constants.STRUCTURELEMENTS));

		$.fn.formular_utils_RemoveAddClass = function(aRemoveClass, anAddClass) {
			if (this.length === 0)
				return;
			else if (this.length > 1) {
				this.each(function() {
					$(this).formular_utils_RemoveAddClass(aRemoveClass, anAddClass);
				});
			} else {
				this.removeClass(aRemoveClass);
				this.addClass(anAddClass);
			}
			return this;
		};

		$.fn.formular_utils_SetInitializing = function() {
			return this.formular_utils_RemoveAddClass("initialized", "initializing");
		};

		$.fn.formular_utils_SetInitialized = function() {
			return this.formular_utils_RemoveAddClass("initializing", "initialized");
		};

		$.fn.formular_utils_SetActive = function() {
			return this.formular_utils_RemoveAddClass("inactive", "active");
		};

		$.fn.formular_utils_SetInactive = function() {
			return this.formular_utils_RemoveAddClass("active", "inactive");
		};

		$.fn.formular_utils_SetValid = function() {
			return this.formular_utils_RemoveAddClass("invalid", "valid");
		};

		$.fn.formular_utils_SetInvalid = function() {
			return this.formular_utils_RemoveAddClass("valid", "invalid");
		};

		$.fn.formular_field_utils_getAssociatedStructurElement = function() {
			if (this.length == 1) {
				if (this.is(CONSTANTS.ASSOCIATEDELEMENTSELECTOR))
					return this;
				else
					return this.parent().formular_field_utils_getAssociatedStructurElement();
			}
		};

	});
})($);
(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Condition", function() {
		var Condition = de.titus.form.Condition = function(aElement) {
			if (Condition.LOGGER.isDebugEnabled())
				Condition.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    formular : undefined,
			    dataContext : undefined,
			    expression : (aElement.attr("data-form-condition") || "").trim(),
			    expressionResolver : new de.titus.core.ExpressionResolver(),
			    timeoutId : undefined
			};

			setTimeout(Condition.prototype.__init.bind(this), 1);
		};

		Condition.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Condition");

		Condition.prototype.__init = function() {
			if (Condition.LOGGER.isDebugEnabled())
				Condition.LOGGER.logDebug("__init()");

			if (this.data.expression !== "") {
				this.data.formular = de.titus.form.utils.FormularUtils.getFormular(this.data.element);
				this.data.dataContext = this.data.element.formular_findDataContext();
				de.titus.form.utils.EventUtils.handleEvent(this.data.formular.data.element, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED, EVENTTYPES.FIELD_VALIDATED ], Condition.prototype.__doCondition.bind(this));
			}

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.INITIALIZED ], Condition.prototype.__doCheck.bind(this));
		};

		Condition.prototype.__doCondition = function(aEvent) {
			if (this.data.timeoutId)
				clearTimeout(this.data.timeoutId);

			this.data.timeoutId = setTimeout(Condition.prototype.__doCheck.bind(this, aEvent), 100);
		};

		Condition.prototype.__doCheck = function(aEvent) {
			if (Condition.LOGGER.isDebugEnabled())
				Condition.LOGGER.logDebug([ "__doCheck(\"", aEvent, "\") -> expression: \"", this.data.expression, "\", element: \"", this.data.element, "\", this: \"", this, "\"" ]);

			aEvent.preventDefault();
			if (aEvent.type != EVENTTYPES.INITIALIZED && aEvent.type != EVENTTYPES.FIELD_VALUE_CHANGED)
				aEvent.stopPropagation();

			if (aEvent.currentTarget == this.data.element && (aEvent.type == EVENTTYPES.CONDITION_STATE_CHANGED || aEvent.Type == EVENTTYPES.VALIDATION_STATE_CHANGED || aEvebt.type == EVENTTYPES.FIELD_VALIDATED))
				; // IGNORE CONDTION_STATE_CHANGE AND VALIDATION_STATE_CHANGED
			// ON SELF
			else if (this.data.expression === "")
				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_MET);
			else {
				var data = this.data.dataContext.getData({
				    condition : true,
				    validate : false
				});

				data = de.titus.form.data.utils.DataUtils.toModel(data, "object");
				if (Condition.LOGGER.isDebugEnabled())
					Condition.LOGGER.logDebug([ "__doCheck() -> data: \"", data, "\", expression: \"", this.data.expression, "\"" ]);

				var result = this.data.expressionResolver.resolveExpression(this.data.expression, data, false);
				if (result)
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_MET);
				else
					de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_NOT_MET);
			}
		};

		de.titus.core.jquery.Components.asComponent("formular_Condition", de.titus.form.Condition);
	});
})($, de.titus.form.Constants.EVENTS);
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.DataContext", function() {
		var DataContext = de.titus.form.DataContext = function(aElement, aOption) {
			this.data = {
			    element : aElement,
			    data : aOption.data,
			    scope : aOption.scope,
			    parentDataContext : undefined,
			    init : false
			};
		};

		DataContext.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.DataContext");

		DataContext.prototype.__getParentDataContext = function() {
			if (!this.data.init) {
				this.data.parentDataContext = this.data.element.formular_findParentDataContext();
				this.data.init = true;
			}

			return this.data.parentDataContext;
		};

		DataContext.prototype.getData = function(aFilter) {
			if (DataContext.LOGGER.isDebugEnabled())
				DataContext.LOGGER.logDebug("getData (\"", aFilter, "\")");

			var dataContext = this.__getParentDataContext() ? this.__getParentDataContext().getData(aFilter) : {};
			var data = typeof this.data.data === "function" ? this.data.data(aFilter) : this.data.data;
			if (data) {
				if (this.data.scope)
					dataContext[this.data.scope] = data;
				else
					$.extend(dataContext, data);
			}

			if (DataContext.LOGGER.isDebugEnabled())
				DataContext.LOGGER.logDebug([ "getData() -> nativ data: ", dataContext ]);

			return dataContext;
		};

		$.fn.formular_DataContext = function(aOption) {
			if (this.length == 1) {
				var dataContext = this.data("de.titus.form.DataContext");
				if (!dataContext || aOption) {
					dataContext = new de.titus.form.DataContext(this, aOption);
					this.data("de.titus.form.DataContext", dataContext);
					this.attr("data-form-data-context", "");
				}

				return dataContext;
			}
		};

		$.fn.formular_findDataContext = function() {
			if (this.length == 1) {
				if (this.attr("data-form-data-context") !== undefined || this.attr("data-form") !== undefined)
					return this.formular_DataContext();
				else
					return this.parent().formular_findDataContext();
			}
		};

		$.fn.formular_findParentDataContext = function() {
			if (this.length == 1)
				return this.parent().formular_findDataContext();
		};
	});

})($);
(function($, ELEMENTS) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Field", function() {
		var Field = de.titus.form.Field = {
			FIELDSELECTORS : [ ELEMENTS.SINGLEFIELD.selector, ELEMENTS.CONTAINERFIELD.selector, ELEMENTS.LISTFIELD.selector ].join(", ")
		};

		$.fn.formular_field_utils_getSubFields = function() {
			var result = [];
			this.children().each(function() {
				var element = $(this);
				if (element.is(Field.FIELDSELECTORS))
					result.push(element.formular_Field());
				else {
					var subFields = element.formular_field_utils_getSubFields();
					if (subFields)
						Array.prototype.push.apply(result, subFields);
				}
			});

			return result;
		};

		$.fn.formular_field_utils_getAssociatedField = function() {
			var field = this.formular_Field();
			if (field)
				return field;

			return this.parent().formular_field_utils_getAssociatedField();
		};

		$.fn.formular_Field = function() {
			if (this.length === 0)
				return;
			else if (this.length > 1) {
				var result = [];
				this.each(function() {
					var field = $(this).formular_Field();
					if (field)
						result.push(field);
				});

				return result;
			} else {
				var field = this.data("de.titus.form.Field");
				if (!field) {
					if (this.is("[data-form-field]"))
						field = new de.titus.form.fields.SingleField(this);
					else if (this.is("[data-form-container-field]"))
						field = new de.titus.form.fields.ContainerField(this);
					else if (this.is("[data-form-list-field]"))
						field = new de.titus.form.fields.ListField(this);

					if (field)
						this.data("de.titus.form.Field", field);
				}

				return field;
			}
		};
	});
})($, de.titus.form.Constants.STRUCTURELEMENTS);
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
(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.ValidationExpression", function() {
		var ValidationExpression = de.titus.form.ValidationExpression = function(aElement) {
			if (ValidationExpression.LOGGER.isDebugEnabled())
				ValidationExpression.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    expression : (aElement.attr("data-form-validation") || "").trim(),
			    expressionResolver : new de.titus.core.ExpressionResolver()
			};
		};

		ValidationExpression.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.ValidationExpression");

		ValidationExpression.prototype.doValidate = function(aContext) {
			if (ValidationExpression.LOGGER.isDebugEnabled())
				ValidationExpression.LOGGER.logDebug([ "doValidate() -> expression: \"", this.data.expression, "\"" ]);
			if (this.data.expression !== "")
				return this.data.expressionResolver.resolveExpression(this.data.expression, aContext, false);

			return true;
		};

		de.titus.core.jquery.Components.asComponent("formular_ValidationExpression", de.titus.form.ValidationExpression);
	});
})();
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
				Page.LOGGER.logDebug([ "__changeConditionState (\"", aEvent, "\") -> page: \"", this, "\"" ]);

			aEvent.preventDefault();
			var valid = this.doValidate();
			if (this.data.valid != valid) {
				this.data.valid = valid;

				if (this.data.valid)
					this.data.element.formular_utils_SetValid();
				else
					this.data.element.formular_utils_SetInvalid();

				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_STATE_CHANGED);
			}
		};

		Page.prototype.doValidate = function(force) {
			return de.titus.form.utils.FormularUtils.isFieldsValid(this.data.fields, force);
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
(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.PageControlHandle", function() {
		var PageControlHandle = de.titus.form.PageControlHandle = function(aPage, aIndex, aStep, aPageController) {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("constructor");
			this.data = {
			    index : aIndex,
			    page : aPage,
			    step : aStep,
			    pageController : aPageController
			};
		};
		
		PageControlHandle.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.PageControlHandle");
		
		PageControlHandle.prototype.hide = function() {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("hide ()");
			if (this.data.page && this.data.page.hide)
				this.data.page.hide();
			
		};
		
		PageControlHandle.prototype.show = function() {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("show ()");
			if (this.data.page && this.data.page.show)
				this.data.page.show();
		};
	});
})($);
(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.PageController", function() {
		var PageController = de.titus.form.PageController = function(aElement) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    pages : [],
			    pageHandles : [],
			    currentHandle : undefined
			};

			setTimeout(PageController.prototype.__init.bind(this), 1);
		};

		PageController.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.PageController");

		PageController.prototype.__init = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__init()");

			var formularElement = this.data.element;
			this.data.pages = this.data.element.find("[data-form-page]").formular_Page();
			if(typeof this.data.pages === 'undefined')
				this.data.pages = [];
			else if (!Array.isArray(this.data.pages))
				this.data.pages = [ this.data.pages ];

			this.data.pageHandles = this.__initPageHandles();

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, EVENTTYPES.ACTION_PAGE_BACK, PageController.prototype.toPrevPage.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.ACTION_PAGE_NEXT, EVENTTYPES.ACTION_SUMMARY, EVENTTYPES.ACTION_SUBMIT ], PageController.prototype.toNextPage.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED, PageController.prototype.__checkCurrentPage.bind(this));
		};

		PageController.prototype.__initPageHandles = function() {
			var handles = [];
			var index = 0;
			var lastStep = de.titus.form.Constants.SPECIALSTEPS.START;
			for (var i = 0; i < this.data.pages.length; i++) {
				var page = this.data.pages[i];
				if (page.data.step !== "")
					lastStep = page.data.step;
				else
					page.data.step = lastStep;

				page.hide();

				var handle = new de.titus.form.PageControlHandle(page, i, lastStep, this);

				handles.push(handle);
			}

			var summaryPage = new de.titus.form.page.utils.VirtualPage(this.data.element, {
			    pageController : this,
			    type : de.titus.form.Constants.TYPES.SUMMARY_PAGE,
			    step : de.titus.form.Constants.SPECIALSTEPS.SUMMARY,
			    event : EVENTTYPES.PAGE_SUMMARY
			});
			handles.push(new de.titus.form.PageControlHandle(summaryPage, handles.length, summaryPage.data.step, this));

			var submittedPage = new de.titus.form.page.utils.VirtualPage(this.data.element, {
			    pageController : this,
			    type : de.titus.form.Constants.TYPES.SUBMITTED_PAGE,
			    step : de.titus.form.Constants.SPECIALSTEPS.SUBMITTED,
			    event : EVENTTYPES.PAGE_SUBMITTED
			});
			handles.push(new de.titus.form.PageControlHandle(submittedPage, handles.length, submittedPage.data.step, this));

			return handles;
		};

		PageController.prototype.__checkCurrentPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__checkCurrentPage()");
			if (!this.data.currentHandle && this.data.pageHandles[0].data.page.data.condition)
				this.__toPageHandle(this.data.pageHandles[0]);

		};

		PageController.prototype.isFirstPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("isFirstPage()");
			return this.data.currentHandle && this.data.currentHandle.data.index === 0;
		};

		PageController.prototype.getCurrentPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("getCurrentPage()");

			if (this.data.currentHandle)
				return this.data.currentHandle.data.page;
		};

		PageController.prototype.getNextPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("getNextPage()");

			return this.__getNextPageHandle().data.page;
		};

		PageController.prototype.hasNextPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("hasNextPage()");

			return this.__getNextPageHandle() !== undefined;
		};

		PageController.prototype.__getNextPageHandle = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__getNextPageHandle()");

			if (!this.data.currentHandle)
				return;
			else if (!this.data.currentHandle.data.page.doValidate(true))
				return this.data.currentHandle;
			else {
				for (var i = this.data.currentHandle.data.index + 1; i < this.data.pageHandles.length; i++) {
					var handle = this.data.pageHandles[i];
					if (handle.data.page.data.condition)
						return handle;
				}
				return this.data.currentHandle;
			}
		};

		PageController.prototype.__getPrevPageHandle = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__getPrevPageHandle()");

			if (!this.data.currentHandle)
				return this.data.pageHandles[0];
			else {
				for (var i = this.data.currentHandle.data.index - 1; 0 <= i; i--) {
					var handle = this.data.pageHandles[i];
					if (handle.data.page.data.condition)
						return handle;
				}
				return this.data.currentHandle;
			}
		};

		PageController.prototype.__toPageHandle = function(aPageHandle) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__toPage()");

			if (aPageHandle) {
				if (this.data.currentHandle) {
					this.data.element.removeClass("step-" + this.data.currentHandle.data.step);
					this.data.currentHandle.hide();
				}

				this.data.currentHandle = aPageHandle;
				this.data.element.addClass("step-" + this.data.currentHandle.data.step);
				this.data.currentHandle.show();

				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.PAGE_CHANGED);
			}
		};

		PageController.prototype.toPrevPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("toPrevPage()");

			var pageHandle = this.__getPrevPageHandle();
			if (pageHandle)
				this.__toPageHandle(pageHandle);
		};

		PageController.prototype.toNextPage = function(execute) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("toNextPage()");

			var pageHandle = this.__getNextPageHandle();
			if (pageHandle)
				this.__toPageHandle(pageHandle);
		};

		de.titus.core.jquery.Components.asComponent("formular_PageController", de.titus.form.PageController);
	});
})($, de.titus.form.Constants.EVENTS);
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
(function($, EVENTTYPES, aEventUtils) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.buttons.BackButton", function() {
		var BackButton = de.titus.form.buttons.BackButton = function(aElement) {
			if (BackButton.LOGGER.isDebugEnabled())
				BackButton.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formularElement : de.titus.form.utils.FormularUtils.getFormularElement(aElement)
			};

			setTimeout(BackButton.prototype.__init.bind(this), 1);
		};

		BackButton.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.buttons.BackButton");

		BackButton.prototype.__init = function() {
			if (BackButton.LOGGER.isDebugEnabled())
				BackButton.LOGGER.logDebug("__init()");

			aEventUtils.handleEvent(this.data.element, "click", BackButton.prototype.execute.bind(this));
			aEventUtils.handleEvent(this.data.formularElement, [ EVENTTYPES.PAGE_CHANGED ], BackButton.prototype.update.bind(this));
			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		BackButton.prototype.execute = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.ACTION_PAGE_BACK);
		};

		BackButton.prototype.update = function(aEvent) {
			if (BackButton.LOGGER.isDebugEnabled())
				BackButton.LOGGER.logDebug("update() -> " + aEvent.type);

			var formular = this.data.formularElement.Formular();
			if (formular.data.state != de.titus.form.Constants.STATE.SUBMITTED) {
				var pageController = this.data.formularElement.formular_PageController();
				if (!pageController.isFirstPage()) {
					this.data.element.formular_utils_SetActive();
					aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_ACTIVE);
					return;
				}
			}

			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		de.titus.core.jquery.Components.asComponent("formular_buttons_BackButton", de.titus.form.buttons.BackButton);
	});
})($, de.titus.form.Constants.EVENTS, de.titus.form.utils.EventUtils);
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
(function($, EVENTTYPES, aEventUtils) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.buttons.ResetButton", function() {
		var ResetButton = de.titus.form.buttons.ResetButton = function(aElement) {
			if (ResetButton.LOGGER.isDebugEnabled())
				ResetButton.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formularElement : de.titus.form.utils.FormularUtils.getFormularElement(aElement)
			};

			setTimeout(ResetButton.prototype.__init.bind(this), 1);
		};

		ResetButton.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.buttons.ResetButton");

		ResetButton.prototype.__init = function() {
			if (ResetButton.LOGGER.isDebugEnabled())
				ResetButton.LOGGER.logDebug("init()");

			aEventUtils.handleEvent(this.data.element, "click", ResetButton.prototype.execute.bind(this));
			aEventUtils.handleEvent(this.data.formularElement, [ EVENTTYPES.ACTION_SUBMIT ], ResetButton.prototype.update.bind(this));
			this.data.element.formular_utils_SetActive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_ACTIVE);
		};

		ResetButton.prototype.execute = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.ACTION_RESET);
		};

		ResetButton.prototype.update = function(aEvent) {
			if (ResetButton.LOGGER.isDebugEnabled())
				ResetButton.LOGGER.logDebug("update() -> " + aEvent.type);

			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		de.titus.core.jquery.Components.asComponent("formular_buttons_ResetButton", de.titus.form.buttons.ResetButton);
	});
})($, de.titus.form.Constants.EVENTS, de.titus.form.utils.EventUtils);
(function($, EVENTTYPES, aEventUtils) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.buttons.SubmitButton", function() {
		var SubmitButton = de.titus.form.buttons.SubmitButton = function(aElement) {
			if (SubmitButton.LOGGER.isDebugEnabled())
				SubmitButton.LOGGER.logDebug("constructor");
			this.data = {
			    element : aElement,
			    formularElement : de.titus.form.utils.FormularUtils.getFormularElement(aElement)
			};

			setTimeout(SubmitButton.prototype.__init.bind(this), 1);
		};

		SubmitButton.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.buttons.SubmitButton");

		SubmitButton.prototype.__init = function() {
			if (SubmitButton.LOGGER.isDebugEnabled())
				SubmitButton.LOGGER.logDebug("__init()");

			aEventUtils.handleEvent(this.data.element, "click", SubmitButton.prototype.execute.bind(this));
			aEventUtils.handleEvent(this.data.formularElement, [ EVENTTYPES.PAGE_CHANGED ], SubmitButton.prototype.update.bind(this));
			this.data.element.formular_utils_SetInactive();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
		};

		SubmitButton.prototype.execute = function(aEvent) {
			aEvent.preventDefault();
			aEvent.stopPropagation();
			aEventUtils.triggerEvent(this.data.element, EVENTTYPES.ACTION_SUBMIT);
		};

		SubmitButton.prototype.update = function(aEvent) {
			if (SubmitButton.LOGGER.isDebugEnabled())
				SubmitButton.LOGGER.logDebug("update() -> " + aEvent.type);

			var pageController = this.data.formularElement.formular_PageController();
			var page = pageController.getCurrentPage();
			if (page.data.type == de.titus.form.Constants.TYPES.SUMMARY_PAGE) {
				this.data.element.formular_utils_SetActive();
				aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_ACTIVE);
			} else {
				this.data.element.formular_utils_SetInactive();
				aEventUtils.triggerEvent(this.data.element, EVENTTYPES.BUTTON_INACTIVE);
			}
		};

		de.titus.core.jquery.Components.asComponent("formular_buttons_SubmitButton", de.titus.form.buttons.SubmitButton);
	});
})($, de.titus.form.Constants.EVENTS, de.titus.form.utils.EventUtils);
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
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.data.utils.DataUtils", function() {
		var DataUtils = de.titus.form.data.utils.DataUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.data.utils.DataUtils"),

		    toModel : function(aData, aModel) {
			    if (DataUtils.LOGGER.isDebugEnabled())
				    DataUtils.LOGGER.logDebug([ "toModel (\"", aData, "\", \"", aModel, "\")" ]);

			    var model = aModel.toLowerCase().trim();
			    if (typeof DataUtils[model] === "function")
				    return DataUtils[model](aData);
			    return aData;
		    }
		};
	});

})($);
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.data.utils.ObjectModel", function() {
		var ObjectModel = de.titus.form.data.utils.ObjectModel = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.data.utils.ObjectModel"),

		    toModel : function(aData) {
			    if (ObjectModel.LOGGER.isDebugEnabled())
				    ObjectModel.LOGGER.logDebug([ "toModel(\"", aData, "\"" ]);
			    if (aData === undefined)
				    return;
			    var result;
			    if (typeof aData.$type === "string") {
				    if (aData.$type == "single-field")
					    return aData.value;
				    else
					    return ObjectModel.toModel(aData.value);
			    } else if (Array.isArray(aData)) {
				    result = [];
				    for (var i = 0; i < aData.length; i++)
					    result.push(ObjectModel.toModel(aData[i]));
			    } else if (typeof aData === "object") {
				    result = {};
				    for ( var name in aData)
					    result[name] = ObjectModel.toModel(aData[name]);
			    } else
				    return aData;

			    return result;
		    }
		};
		$.extend(de.titus.form.data.utils.DataUtils, {
			"object" : ObjectModel.toModel
		});
	});

})($);
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
(function($, EventUtils, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.fields.ContainerField", function() {
		var ContainerField = de.titus.form.fields.ContainerField = function(aElement) {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    dataContext : undefined,
			    name : (aElement.attr("data-form-container-field") || "").trim(),
			    active : false,
			    required : (aElement.attr("data-form-required") !== undefined),
			    requiredOnActive : (aElement.attr("data-form-required") === "on-condition-true"),
			    condition : undefined,
			    // always valid, because it's only a container
			    valid : undefined,
			    fields : []
			};

			this.data.element.formular_DataContext({
			    data : ContainerField.prototype.getData.bind(this),
			    scope : "$container"
			});
			this.hide();
			setTimeout(ContainerField.prototype.__init.bind(this), 1);
		};

		ContainerField.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.fields.ContainerField");

		ContainerField.prototype.__init = function() {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("init()");

			this.data.dataContext = this.data.element.formular_findParentDataContext();
			EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET, EVENTTYPES.CONDITION_NOT_MET ], ContainerField.prototype.__changeConditionState.bind(this));
			EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED ], ContainerField.prototype.__handleValidationEvent.bind(this), "*");

			this.data.fields = this.data.element.formular_field_utils_getSubFields();
			
			this.data.element.formular_Condition();

			EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
			
			if(typeof this.data.fields === 'undefined' || this.data.fields.length == 0)
				this.doValidate(true);			
		};

		ContainerField.prototype.__changeConditionState = function(aEvent) {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug([ "__changeConditionState()  for \"", this.data.name, "\" -> ", aEvent ]);

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

				EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED);
			}
		};

		ContainerField.prototype.__handleValidationEvent = function(aEvent) {
			this.doValidate(true);
		};

		ContainerField.prototype.doValidate = function(force) {
			if (force) {
				var oldValid = this.data.valid;
				this.data.valid = de.titus.form.utils.FormularUtils.isFieldsValid(this.data.fields, force);
				if (oldValid != this.data.valid) {
					if (this.data.valid)
						this.data.element.formular_utils_SetValid();
					else
						this.data.element.formular_utils_SetInvalid();
				}
			}

			return this.data.valid;
		};

		ContainerField.prototype.hide = function() {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("hide ()");

			this.data.active = false;
			this.data.element.formular_utils_SetInactive();
			for (var i = 0; i < this.data.fields.length; i++)
				this.data.fields[i].hide();

		};

		ContainerField.prototype.show = function() {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("show ()");
			if (this.data.condition) {
				this.data.element.formular_utils_SetActive();
				for (var i = 0; i < this.data.fields.length; i++)
					this.data.fields[i].show();

				this.data.active = true;
			}
		};

		ContainerField.prototype.summary = function() {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("summary ()");
			if (this.data.condition) {
				for (var i = 0; i < this.data.fields.length; i++)
					this.data.fields[i].summary();

				this.data.element.formular_utils_SetActive();
			}
		};

		ContainerField.prototype.getData = function(aFilter) {
			if (ContainerField.LOGGER.isDebugEnabled())
				ContainerField.LOGGER.logDebug("getData(\"", aFilter, "\")");

			var result;
			if (aFilter.example)
				result = de.titus.form.utils.FormularUtils.toBaseModel(this.data.fields, aFilter);
			else if (this.data.condition && (this.data.active || (this.data.condition && this.data.valid)))
				result = de.titus.form.utils.FormularUtils.toBaseModel(this.data.fields, aFilter);
			else
				return;

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
	});
})($, de.titus.form.utils.EventUtils, de.titus.form.Constants.EVENTS);
(function($, EventUtils, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.fields.ListField", function() {
		var ListField = de.titus.form.fields.ListField = function(aElement) {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    dataContext : undefined,
			    name : (aElement.attr("data-form-list-field") || "").trim(),
			    template : aElement.find("[data-form-content-template]").detach(),
			    contentContainer : aElement.find("[data-form-content-container]"),
			    addButton : aElement.find("[data-form-list-field-action-add]"),
			    required : (aElement.attr("data-form-required") !== undefined),
			    requiredOnActive : (aElement.attr("data-form-required") === "on-condition-true"),
			    min : parseInt(aElement.attr("data-form-list-field-min") || "0"),
			    max : parseInt(aElement.attr("data-form-list-field-max") || "0"),
			    condition : undefined,
			    valid : undefined,
			    items : []
			};

			this.data.element.formular_DataContext({
			    data : ListField.prototype.getData.bind(this),
			    scope : "$list"
			});
			this.hide();
			setTimeout(ListField.prototype.__init.bind(this), 1);
		};

		ListField.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.fields.ListField");

		ListField.prototype.__init = function() {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("init()");

			this.data.dataContext = this.data.element.formular_findParentDataContext();
			EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET, EVENTTYPES.CONDITION_NOT_MET ], ListField.prototype.__changeConditionState.bind(this));
			EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED, EVENTTYPES.FIELD_VALUE_CHANGED ], ListField.prototype.__handleValidationEvent.bind(this), "*");

			this.data.element.formular_Condition();

			EventUtils.handleEvent(this.data.addButton, [ "click" ], ListField.prototype.__addItem.bind(this));

			EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
			this.doValidate();
		};

		ListField.prototype.__addItem = function(aEvent) {
			var item = {
			    id : ("item-" + de.titus.core.UUID()),
			    index : this.data.items.length,
			    element : this.data.template.clone(),
			    field : undefined
			};
			item.element = this.data.template.clone();
			item.element.attr("id", item.id);
			item.element.attr("data-form-list-item", item.id);
			if (item.element.attr("data-form-container-field") === undefined)
				item.element.attr("data-form-container-field", "item");
			item.element.formular_utils_SetInitializing();

			this.data.items.push(item);
			item.element.appendTo(this.data.contentContainer);

			EventUtils.handleEvent(item.element.find("[data-form-list-field-action-remove]"), [ "click" ], ListField.prototype.__removeItem.bind(this));

			setTimeout(ListField.prototype.__initializeItem.bind(this, item), 1);
		};

		ListField.prototype.__initializeItem = function(aItem) {
			aItem.field = aItem.element.formular_Field();
			aItem.element.formular_DataContext({
			    data : (function(aFilter) {
				    var data = this.field.getData(aFilter);
				    if (data)
					    return data.value;
			    }).bind(aItem),
			    scope : "$item"
			});

			aItem.element.formular_initMessages();

			aItem.element.formular_utils_SetInitialized();
			EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALUE_CHANGED);
			this.doValidate();
			this.__doCheckAddButton();
		};

		ListField.prototype.__removeItem = function(aEvent) {

			var target = $(aEvent.target);
			var itemElement = target.parents("[data-form-list-item]");
			var itemId = itemElement.attr("id");

			for (var i = 0; i < this.data.items.length; i++) {
				var item = this.data.items[i];
				if (item.id == itemId) {
					this.data.items.splice(i, 1);
					itemElement.remove();					
					//this.doValidate();
					this.__handleValidationEvent(aEvent);
					this.__doCheckAddButton();
					EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALUE_CHANGED);
					return;
				}
			}

		};

		ListField.prototype.__doCheckAddButton = function() {
			if (this.data.max === 0 || this.data.items.length < this.data.max)
				this.data.element.find("[data-form-list-field-action-add]").formular_utils_SetActive();
			else
				this.data.element.find("[data-form-list-field-action-add]").formular_utils_SetInactive();
		};

		ListField.prototype.__changeConditionState = function(aEvent) {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug([ "__changeConditionState()  for \"", this.data.name, "\" -> ", aEvent ]);

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

				EventUtils.triggerEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED);
			}
		};

		ListField.prototype.__handleValidationEvent = function(aEvent) {
			var oldValid = this.data.valid;
			this.doValidate();

			if (this.data.valid != oldValid)
				EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_STATE_CHANGED);

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALIDATED);
		};
		

		ListField.prototype.doValidate = function(force) {
			var oldValid = this.data.valid;
			if (this.data.items.length === 0)
				this.data.valid = !this.data.required;
			else if (this.data.items.length < this.data.min)
				this.data.valid = false;
			else if (this.data.max !== 0 && this.data.items.length > this.data.max)
				this.data.valid = false;
			else
				this.data.valid = this.__isListItemsValid();

			if (oldValid != this.data.valid) {
				if (this.data.valid)
					this.data.element.formular_utils_SetValid();
				else
					this.data.element.formular_utils_SetInvalid();
			}

			return this.data.valid;
		};

		ListField.prototype.__isListItemsValid = function() {
			for (var i = 0; i < this.data.items.length; i++) {
				var item = this.data.items[i];
				if (!item.field.data.valid)
					return false;
			}

			return true;
		};

		ListField.prototype.hide = function() {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("hide ()");

			this.data.element.formular_utils_SetInactive();
			for (var i = 0; i < this.data.items.length; i++) {
				var item = this.data.items[i];
				item.field.hide();
			}
		};

		ListField.prototype.show = function() {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("show ()");
			if (this.data.condition) {
				this.data.element.formular_utils_SetActive();
				for (var i = 0; i < this.data.items.length; i++) {
					var item = this.data.items[i];
					item.field.show();
				}
			}
			this.data.element.find("[data-form-list-field-action-remove]").formular_utils_SetActive();
			this.__doCheckAddButton();
		};

		ListField.prototype.summary = function() {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("summary ()");
			if (this.data.condition) {
				for (var i = 0; i < this.data.items.length; i++) {
					var item = this.data.items[i];
					item.field.summary();
				}
				this.data.element.formular_utils_SetActive();
			}
			this.data.element.find("[data-form-list-field-action-remove]").formular_utils_SetInactive();
			this.data.element.find("[data-form-list-field-action-add]").formular_utils_SetInactive();
		};

		ListField.prototype.getData = function(aFilter) {
			if (ListField.LOGGER.isDebugEnabled())
				ListField.LOGGER.logDebug("getData(\"", aFilter, "\")");

			var items = [];
			if (aFilter.example)
				items = ListField.getExample(aFilter);
			else if (this.data.condition && (this.data.valid || aFilter.validate || aFilter.condition)) {
				for (var i = 0; i < this.data.items.length; i++) {
					var item = this.data.items[i];
					var fieldData = item.field.getData(aFilter);
					if (fieldData && fieldData.value)
						items.push(fieldData.value);
				}
			} else
				return;

			if (items.length > 0) {
				return {
				    name : this.data.name,
				    type : "list-field",
				    $type : "list-field",
				    value : items
				};
			}
		};

		ListField.prototype.getExample = function(aFilter) {
			// TODO
		};
	});
})($, de.titus.form.utils.EventUtils, de.titus.form.Constants.EVENTS);
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
(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.page.utils.VirtualPage", function() {
		var Page = de.titus.form.page.utils.VirtualPage = function(aElement, theOptions) {
			this.data = {
			    element : aElement,
			    pageController : theOptions.pageController,
			    type : theOptions.type,
			    valid : true,
			    condition : true,
			    step : theOptions.step,
			    event : theOptions.event
			};
		};

		Page.prototype.show = function() {
			var pages = this.data.pageController.data.pages;
			for (var i = 0; i < pages.length; i++)
				pages[i].summary();

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, this.data.event);
		};

		Page.prototype.hide = function() {
			var pages = this.data.pageController.data.pages;
			for (var i = 0; i < pages.length; i++)
				pages[i].hide();

		};

		Page.prototype.doValidate = function() {
			return true;
		};
	});
})($);
