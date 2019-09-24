//dependencies from npm
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

//own dependencies
import Constants from "../Constants";
import DataContext from "../DataContext";
import EventUtils from "../utils/EventUtils";
import HtmlStateUtils from "../utils/HtmlStateUtils";
import FieldUtils from "./FieldUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.fields.ContainerField");

const Field = function (anElement, aContainer, aForm) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("constructor");

    this.data = {
        element : anElement,
        container : aContainer,
        dataContext : aContainer.data.dataContext,
        name : (anElement.attr("data-form-container-field") || "").trim(),
        active : false,
        required : (anElement.attr("data-form-required") !== undefined),
        requiredOnActive : (anElement.attr("data-form-required") === "on-condition-true"),
        condition : undefined,
        // always valid, because it's only a container
        valid : undefined,
        fields : []
    };
    
    this.data.dataContext = new DataContext(this.data.element, {
        data : Field.prototype.getData.bind(this),
        scope : "$container"
    });
};

Field.prototype.__changeConditionState = function (aEvent) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "__changeConditionState()  for \"", this.data.name,
                "\" -> ", aEvent ]);

    aEvent.preventDefault();
    aEvent.stopPropagation();

    var condition = false;
    if (aEvent.type == Constants.EVENTS.CONDITION_MET)
        condition = true;

    if (this.data.condition != condition) {
        this.data.condition = condition;
        if (this.data.condition)
            this.show();
        else
            this.hide();

        EventUtils.triggerEvent(this.data.element,
                Constants.EVENTS.CONDITION_STATE_CHANGED);
    }
    this.doValidate(true);
};

Field.prototype.__handleValidationEvent = function (aEvent) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "__handleValidationEvent()  for \"", this.data.name,
                "\" -> ", aEvent ]);
    aEvent.preventDefault();
    aEvent.stopPropagation();
    this.doValidate(true);
};

Field.prototype.doValidate = function (force) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "doValidate()  for \"", this.data.name ]);
//
//    var oldValid = this.data.valid;
//    if (typeof this.data.fields === 'undefined' || this.data.fields.length == 0)
//        this.data.valid = true;
//    else if (!this.data.condition
//            && (!this.data.required || this.data.requiredOnActive))
//        this.data.valid = true;
//    else
//        this.data.valid = de.titus.form.utils.FormularUtils.isFieldsValid(this.data.fields, force);
//
//    if (oldValid != this.data.valid) {
//        if (this.data.valid)
//            //this.data.element.formular_utils_SetValid();
//            ;
//        else
//            //this.data.element.formular_utils_SetInvalid();
//            ;
//
//        EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_STATE_CHANGED);
//    }

    return this.data.valid;
};

Field.prototype.__inactive = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("__inactive()");
    
    this.data.active = false;
    HtmlStateUtils.doSetInactive(this.data.element);

};

Field.prototype.__active = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("__active ()");

    if (this.data.condition) {
        HtmlStateUtils.doSetActive(this.data.element);
        this.data.active = true;
    }
};

Field.prototype.__summary = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("__summary ()");
    
    HtmlStateUtils.doSetActive(this.data.element);
};


Field.prototype.getData = function (aFilter) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("getData(\"", aFilter, "\")");

    var result;
    if (aFilter.example)
        result = de.titus.form.utils.FormularUtils.toBaseModel(
                this.data.fields, aFilter);
    else if (this.data.condition
            && (this.data.active || (this.data.condition && this.data.valid)))
        result = de.titus.form.utils.FormularUtils.toBaseModel(
                this.data.fields, aFilter);
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

const FieldBuilder = function(anElement, aContainer, aForm){
    return new Promise(function(resolve){
        requestAnimationFrame((function(){
            if (LOGGER.isDebugEnabled())
                LOGGER.logDebug("init()");
            
            this.__inactive();
            
            EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_MET,
                Constants.EVENTS.CONDITION_NOT_MET ],
                Field.prototype.__changeConditionState.bind(this));
            EventUtils.handleEvent(this.data.element, [
                Constants.EVENTS.CONDITION_STATE_CHANGED,
                Constants.EVENTS.VALIDATION_STATE_CHANGED ],
                Field.prototype.__handleValidationEvent.bind(this), "*");
            
            FieldUtils.buildChildFields(this.data.element,this,this.data.form)
            .then((function(theFields){
                this.data.fields = theFields;
                //this.data.element.formular_Condition();
                
                EventUtils.triggerEvent(this.data.element, Constants.EVENTS.INITIALIZED);
                this.doValidate(true);
                resolve(this);
            }).bind(this));            
        }).bind(new Field(anElement, aContainer, aForm)));
    });
};

export {Field, FieldBuilder};
export default FieldBuilder;