import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import DataContext from "src/DataContext";
import EventUtils from "src/utils/EventUtils";
import HtmlStateUtil from "src/utils/HtmlStateUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.fields.ContainerField");

const Field = function (aElement) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("constructor");

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
        data : Field.prototype.getData.bind(this),
        scope : "$container"
    });
    this.hide();
    setTimeout(Field.prototype.__init.bind(this), 1);
};

Field.prototype.__init = function () {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("init()");

    this.data.dataContext = this.data.element.formular_findParentDataContext();
    EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET,
            EVENTTYPES.CONDITION_NOT_MET ],
            Field.prototype.__changeConditionState.bind(this));
    EventUtils.handleEvent(this.data.element, [
            EVENTTYPES.CONDITION_STATE_CHANGED,
            EVENTTYPES.VALIDATION_STATE_CHANGED ],
            Field.prototype.__handleValidationEvent.bind(this), "*");

    this.data.fields = this.data.element.formular_field_utils_getSubFields();

    this.data.element.formular_Condition();

    EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
    this.doValidate(true);
};

Field.prototype.__changeConditionState = function (aEvent) {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug([ "__changeConditionState()  for \"", this.data.name,
                "\" -> ", aEvent ]);

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

        EventUtils.triggerEvent(this.data.element,
                EVENTTYPES.CONDITION_STATE_CHANGED);
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

    var oldValid = this.data.valid;
    if (typeof this.data.fields === 'undefined' || this.data.fields.length == 0)
        this.data.valid = true;
    else if (!this.data.condition
            && (!this.data.required || this.data.requiredOnActive))
        this.data.valid = true;
    else
        this.data.valid = de.titus.form.utils.FormularUtils.isFieldsValid(
                this.data.fields, force);

    if (oldValid != this.data.valid) {
        if (this.data.valid)
            this.data.element.formular_utils_SetValid();
        else
            this.data.element.formular_utils_SetInvalid();

        EventUtils.triggerEvent(this.data.element,
                EVENTTYPES.VALIDATION_STATE_CHANGED);
    }

    return this.data.valid;
};

Field.prototype.hide = function () {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("hide ()");

    this.data.active = false;
    this.data.element.formular_utils_SetInactive();
    for (var i = 0; i < this.data.fields.length; i++)
        this.data.fields[i].hide();

};

Field.prototype.show = function () {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("show ()");
    if (this.data.condition) {
        this.data.element.formular_utils_SetActive();
        for (var i = 0; i < this.data.fields.length; i++)
            this.data.fields[i].show();

        this.data.active = true;
    }
};

Field.prototype.summary = function () {
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("summary ()");
    if (this.data.condition) {
        for (var i = 0; i < this.data.fields.length; i++)
            this.data.fields[i].summary();

        this.data.element.formular_utils_SetActive();
    }
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


export default Field;