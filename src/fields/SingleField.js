// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

//own dependencies
import Constants from "../Constants";
import DataContext from "../DataContext";
import EventUtils from "../utils/EventUtils";
import HtmlStateUtil from "../utils/HtmlStateUtils";
import Registry from "../Registry";
import ConditionBuilder from "../Condition";
import MessageBuilder from "../Message";

const LOGGER = LoggerFactory.newLogger("de.titus.form.fields.SingleField");
const Field = function(anElement, aContainer, aForm) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
	    element : anElement,
	    container : aContainer,
	    form : aForm,
	    parentDataContext : aContainer.data.dataContext,
	    dataContext : undefined,
	    name : (anElement.attr("data-form-field") || "").trim(),
	    type : (anElement.attr("data-form-field-type") || "default").trim(),
	    required : (anElement.attr("data-form-required") !== undefined),
	    requiredOnActive : (anElement.attr("data-form-required") === "on-condition-true"),
	    condition : false,
	    valid : undefined,
	    controller : undefined
	};
	
	this.__init();
};

Field.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init()");
	
	this.data.dataContext = new DataContext(this.data.element, {
        data : Field.prototype.getData.bind(this),
        scope : "$field"
    });

	this.data.controller = Registry.getFieldController(this.data.type, this.data.element);
	EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_MET, Constants.EVENTS.CONDITION_NOT_MET ], Field.prototype.__changeConditionState.bind(this));
	EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.VALIDATION_VALID, Constants.EVENTS.VALIDATION_INVALID ], Field.prototype.__changeValidationState.bind(this));

	let containerElement = this.data.container.data.element;
	EventUtils.handleEvent(containerElement, [Constants.EVENTS.STATE_ACTIVE], Field.prototype.__active.bind(this));
    EventUtils.handleEvent(containerElement, [Constants.EVENTS.STATE_ACTIVE_SUMMARY], Field.prototype.__summary.bind(this));
    EventUtils.handleEvent(containerElement, [Constants.EVENTS.STATE_INACTIVE], Field.prototype.__inactive.bind(this));
	
	ConditionBuilder(this.data.element, this.data.container, this.data.form).then((function(aCondition){
		if(typeof aCondition === "undefined")
			this.data.condition = true;		
	}).bind(this));
	MessageBuilder(this.data.element.find("[data-form-message]"), this, this.data.form);
	
	
//	this.data.element.formular_Validation();

	EventUtils.triggerEvent(this.data.element, Constants.EVENTS.INITIALIZED);
};

Field.prototype.__changeConditionState = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("__changeConditionState()  for \"" + this.data.name + "\" -> " + aEvent.type);

	aEvent.preventDefault();
	aEvent.stopPropagation();

	let condition = false;
	if (aEvent.type == Constants.EVENTS.CONDITION_MET)
		condition = true;

	if (this.data.condition != condition) {
		this.data.condition = condition;
		if (this.data.condition)
			this.__active();
		else
			this.__inactive();

		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_STATE_CHANGED);
	}
};

Field.prototype.__changeValidationState = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__changeValidationState() for field \"", this.data.name, "\" -> ", aEvent.type, "; field: \"", this, "\"" ]);

	aEvent.preventDefault();
	aEvent.stopPropagation();

	let valid = aEvent.type == Constants.EVENTS.VALIDATION_VALID;

	if (this.data.valid != valid) {
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug("__changeValidationState() for field \"" + this.data.name + "\" from " + this.data.valid + " -> " + valid);

		this.data.valid = valid;

		if (this.data.valid)
			this.data.element.formular_utils_SetValid();
		else
			this.data.element.formular_utils_SetInvalid();

		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_STATE_CHANGED);
	}

	EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FIELD_VALIDATED);
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

Field.prototype.__inactive = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("hide ()");

	HtmlStateUtils.doSetInactive(this.data.element);
	EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FIELD_HIDE);
};

Field.prototype.__active = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("show ()");
	if (this.data.condition) {
	    HtmlStateUtils.doSetActive(this.data.element);
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FIELD_SHOW);
	}
};

Field.prototype.__summary = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("summary ()");
	if (this.data.condition) {
        HtmlStateUtils.doSetActive(this.data.element);
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FIELD_SUMMARY);
	}
};

Field.prototype.getData = function(aFilter) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "getData(\"", aFilter, "\")" ]);

	debugger;
	let result;
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

const FieldBuilder = function(anElement, aContainer, aForm){
    return new Promise(function(resolve){
        requestAnimationFrame(function(){
            //TODO init method into builder function        	
            resolve(new Field(anElement, aContainer, aForm));
        });        
    });
};

export {Field, FieldBuilder};
export default FieldBuilder;
