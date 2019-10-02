// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import ExpressionResolver from "modules/de.titus.core/src/ExpressionResolver";

//own dependencies
import Constants from "./Constants";
import DataContext from "./DataContext";
import DataUtils from "./utils/DataUtils";
import EventUtils from "./utils/EventUtils";
import HtmlStateUtils from "./utils/HtmlStateUtils";
import FieldUtils from "./fields/FieldUtils";


const CLASSNAME = "de.titus.form.Validation";
const ATTRIBUTE = "data-form-validation";
const SELECTOR = "[" + ATTRIBUTE + "]";
const LOGGER = LoggerFactory.newLogger(CLASSNAME);
const EXPRESSION_RESOLVER = ExpressionResolver.DEFAULT;

const Validation = function(aValidations, aField, aContainer, aForm) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
	    element : aField.data.element,
	    field : aField,
	    container : aContainer, 
	    form : aForm,
	    dataContext : aContainer.data.dataContext,
	    validations : (function(){
	    	let result = [];
	    	aValidations.forEach(function(aElement){
	    		result.push({
	    			element : aElement,
	    			expression : aElement.attr(ATTRIBUTE)
	    		});
	    	})
	    	return result;
	    })(),
	    timeoutId : undefined
	};

	EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.INITIALIZED, Constants.EVENTS.FIELD_VALUE_CHANGED ], Validation.prototype.__doLazyValidate.bind(this));
	EventUtils.handleEvent(this.data.form.data.element, [ Constants.EVENTS.CONDITION_STATE_CHANGED, Constants.EVENTS.VALIDATION_STATE_CHANGED ], Validation.prototype.__doLazyValidate.bind(this));
};

Validation.prototype.__doLazyValidate = function(aEvent) {
	if (typeof this.data.timeoutId !== "undefined")
		clearTimeout(this.data.timeoutId);

	this.data.timeoutId = setTimeout(Validation.prototype.__handleEvent.bind(this, aEvent), 300);
};

Validation.prototype.__handleEvent = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__handleEvent(\"", aEvent, "\")" ]);

	aEvent.preventDefault();

	if (aEvent.type != Constants.EVENTS.INITIALIZED && aEvent.type != Constants.EVENTS.FIELD_VALUE_CHANGED)
		aEvent.stopPropagation();

	if (aEvent.currentTarget == this.data.element && aEvent.Type == Constants.EVENTS.VALIDATION_STATE_CHANGED)
		return;

	if (this.doValidate())
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_VALID);
	else
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_INVALID);
};

Validation.prototype.doValidate = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("doValidate()");
	
	HtmlStateUtils.doSetInactive(this.data.element.find(SELECTOR));
	
	let fieldData = this.data.field.getData({
	    condition : false,
	    validate : true
	});
	let hasValue = !this.__valueEmpty(fieldData);

	if (hasValue)
		this.data.element.removeClass("no-value");
	else
		this.data.element.addClass("no-value");

	let condition = this.data.field.data.condition;
	let required = this.data.field.data.required;
	let requiredOnActive = this.data.field.data.requiredOnActive;
	let hasValidations = this.data.validations.length > 0;

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
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__checkValidation(\"", aFieldData, "\")" ]);

	let data = this.data.dataContext.getData({
	    condition : false,
	    validate : true
	});
	data.$value = aFieldData ? aFieldData.value : undefined;

	data = DataUtils.toModel(data);
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__checkValidation() -> dataContext: \"", data, "\"" ]);

	for (let i = 0; i < this.data.validations.length; i++) {
		let validation = this.data.validations[i];
		if (!EXPRESSION_RESOLVER.resolveExpression(validation.expression, data, false)) {
			HtmlStateUtils.doSetActive(validation.element);
			return false;
		}
	}
	return true;
};

Validation.prototype.__valueEmpty = function(aFieldData) {
	return aFieldData === undefined || aFieldData.value === undefined || (Array.isArray(aFieldData.value) && aFieldData.value.length === 0) || (typeof aFieldData.value === "string" && aFieldData.value.trim().length === 0);
};

const ValidationBuilder = function(aField, aContainer, aForm){	
	return new Promise(function(resolve){
		requestAnimationFrame(function(){
			let validation = aField.data.element.data(CLASSNAME);
			if(typeof validation === "undefined"){
				let validationExpressions = aField.data.element.find(SELECTOR);
				if(aField.data.required || validationExpressions.length > 0){
					validation = new Validation(validationExpressions, aField, aContainer, aForm);
					aField.data.element.data(CLASSNAME, validation);
				}
			}
			resolve(validation);
		});
	});	
};

export {Validation, ValidationBuilder};
export default ValidationBuilder;

