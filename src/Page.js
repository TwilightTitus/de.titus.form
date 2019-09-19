import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import DataContext from "src/DataContext";
import EventUtils from "src/utils/EventUtils";
import HtmlStateUtil from "src/utils/HtmlStateUtils";
import FieldUtils from "src/fields/FieldUtils";

const LOGGER = LoggerFactory.getInstance().newLogger("de.titus.form.Page");

const Page = function(aPageElement, aForm){
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("constructor");
    this.data = {
        element : aElement,
        formular : aForm,
        dataContext : undefined,
        type : Constants.TYPES.PAGE,
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
    requestAnimationFrame(Page.prototype.__init.bind(this));
};



Page.prototype.__init = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("__init()");

    this.data.dataContext = DataContext.findParentDataContext(this.data.element);

    EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_MET, Constants.EVENTS.CONDITION_NOT_MET ], Page.prototype.__changeConditionState.bind(this));
    EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_STATE_CHANGED, Constants.EVENTS.VALIDATION_STATE_CHANGED ], Page.prototype.__changeValidationState.bind(this));
    
    EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_ACTIVE], Page.prototype.__active.bind(this));
    EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_ACTIVE_SUMMARY], Page.prototype.__summary.bind(this));
    EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_INACTIVE], Page.prototype.__inactive.bind(this));
    
    
    this.data.fields = FieldUtils.buildChildFields(this.data.element,this.data.element,this.data.form);          
    this.data.element.formular_Condition();

    EventUtils.triggerEvent(this.data.element, Constants.EVENTS.PAGE_INITIALIZED);
};

Page.prototype.__changeConditionState = function(aEvent) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "__changeConditionState (\"", aEvent, "\") -> page: \"", this, "\"" ]);

    aEvent.preventDefault();
    aEvent.stopPropagation();

    let condition = false;
    if (aEvent.type == Constants.EVENTS.CONDITION_MET)
        condition = true;

    if (this.data.condition != condition) {
        this.data.condition = condition;
        EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_STATE_CHANGED);
    }
};

Page.prototype.__changeValidationState = function(aEvent) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "__changeValidationState (\"", aEvent, "\") -> page: \"", this, "\"" ]);

    aEvent.preventDefault();
    this.doValidate(true);          
};

Page.prototype.doValidate = function(force) {
    if (force) {
        var oldValid = this.data.valid;
        this.data.valid = FormularUtils.isFieldsValid(this.data.fields, force);
        if (oldValid != this.data.valid) {
            if (this.data.valid)
                this.data.element.formular_utils_SetValid();
            else
                this.data.element.formular_utils_SetInvalid();
            
            EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_STATE_CHANGED);
        }
    }

    return this.data.valid;
};

Page.prototype.__inactive = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("hide ()");
    this.data.active = false;
    HtmlStateUtils.doSetInactive(this.data.element);

};

Page.prototype.__active = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("show ()");

    if (this.data.condition) {
        HtmlStateUtils.doSetActive(this.data.element);
        this.data.active = true;
    }
};

Page.prototype.__summary = function() {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("summary ()");
    
    HtmlStateUtils.doSetActive(this.data.element);

};

Page.prototype.getData = function(aFilter) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "getData(\"", aFilter, "\") -> page: \"", this, "\"" ]);

    var result;
    if (aFilter.example)
        result = FormularUtils.toBaseModel(this.data.fields, aFilter);
    else if (this.data.active || (this.data.condition && this.data.valid))
        result = FormularUtils.toBaseModel(this.data.fields, aFilter);
    else
        return;

    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "getData() -> result: \"", result, "\"" ]);

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


export default Page;