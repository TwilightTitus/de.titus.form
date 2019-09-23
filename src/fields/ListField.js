import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import DataContext from "src/DataContext";
import EventUtils from "src/utils/EventUtils";
import HtmlStateUtil from "src/utils/HtmlStateUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.fields.ListField");

const Field = function(aElement) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

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
	    data : Field.prototype.getData.bind(this),
	    scope : "$list"
	});
	this.hide();
	setTimeout(Field.prototype.__init.bind(this), 1);
};
Field.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init()");

	this.data.dataContext = this.data.element.formular_findParentDataContext();
	EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_MET, EVENTTYPES.CONDITION_NOT_MET ], Field.prototype.__changeConditionState.bind(this));
	EventUtils.handleEvent(this.data.element, [ EVENTTYPES.CONDITION_STATE_CHANGED, EVENTTYPES.VALIDATION_STATE_CHANGED, EVENTTYPES.FIELD_VALUE_CHANGED ], Field.prototype.__handleValidationEvent.bind(this), "*");

	this.data.element.formular_Condition();

	EventUtils.handleEvent(this.data.addButton, [ "click" ], Field.prototype.__addItem.bind(this));

	EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
	this.doValidate();
};

Field.prototype.__addItem = function(aEvent) {
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

	EventUtils.handleEvent(item.element.find("[data-form-list-field-action-remove]"), [ "click" ], Field.prototype.__removeItem.bind(this));

	setTimeout(Field.prototype.__initializeItem.bind(this, item), 1);
};

Field.prototype.__initializeItem = function(aItem) {
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

Field.prototype.__removeItem = function(aEvent) {

	var target = $(aEvent.target);
	var itemElement = target.parents("[data-form-list-item]");
	var itemId = itemElement.attr("id");

	for (var i = 0; i < this.data.items.length; i++) {
		var item = this.data.items[i];
		if (item.id == itemId) {
			this.data.items.splice(i, 1);
			itemElement.remove();					
			// this.doValidate();
			this.__handleValidationEvent(aEvent);
			this.__doCheckAddButton();
			EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALUE_CHANGED);
			return;
		}
	}

};

Field.prototype.__doCheckAddButton = function() {
	if (this.data.max === 0 || this.data.items.length < this.data.max)
		this.data.element.find("[data-form-list-field-action-add]").formular_utils_SetActive();
	else
		this.data.element.find("[data-form-list-field-action-add]").formular_utils_SetInactive();
};

Field.prototype.__changeConditionState = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__changeConditionState()  for \"", this.data.name, "\" -> ", aEvent ]);

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

Field.prototype.__handleValidationEvent = function(aEvent) {
	var oldValid = this.data.valid;
	this.doValidate();

	if (this.data.valid != oldValid)
		EventUtils.triggerEvent(this.data.element, EVENTTYPES.VALIDATION_STATE_CHANGED);

	de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.FIELD_VALIDATED);
};


Field.prototype.doValidate = function(force) {
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

Field.prototype.__isListItemsValid = function() {
	for (var i = 0; i < this.data.items.length; i++) {
		var item = this.data.items[i];
		if (!item.field.data.valid)
			return false;
	}

	return true;
};

Field.prototype.hide = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("hide ()");

	this.data.element.formular_utils_SetInactive();
	for (var i = 0; i < this.data.items.length; i++) {
		var item = this.data.items[i];
		item.field.hide();
	}
};

Field.prototype.show = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("show ()");
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

Field.prototype.summary = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("summary ()");
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

Field.prototype.getData = function(aFilter) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("getData(\"", aFilter, "\")");

	var items = [];
	if (aFilter.example)
		items = Field.getExample(aFilter);
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

Field.prototype.getExample = function(aFilter) {
	// TODO
};

export default Field;
