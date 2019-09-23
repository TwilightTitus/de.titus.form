//dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import ExpressionResolver from "modules/de.titus.core/src/ExpressionResolver";

//own dependencies
import Constants from "src/Constants";
import DataContext from "src/DataContext";
import EventUtils from "src/utils/EventUtils";
import HtmlStateUtils from "src/utils/HtmlStateUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.Form");
const Expression =  ExpressionResolver.DEFAULT;


const Form = function(aElement) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
	    element : aElement,
	    name : aElement.attr("data-form"),
	    state : Constants.STATE.INPUT,
	    pages : []
	};

	new DataContext(aElement, {
		data : Form.prototype.getData.bind(this)
	});

	HtmlStateUtils.doSetInitializing(this.data.element);
	requestAnimationFrame(Form.prototype.__init.bind(this));
};

Form.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init()");

	EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.ACTION_SUBMIT ], Form.prototype.submit.bind(this));

	this.data.element.find(Constants.STRUCTURELEMENTS.PAGE.selector).foreach((function(aElement){
	    this.data.pages.push(new Page(aElement, this));
	}).bind(this));
	

	setTimeout((function() {
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.INITIALIZED);
		HtmlStateUtils.doSetInitialized(this.data.element);
	}).bind(this), 1);
};

Form.prototype.getData = function(aFilter, aModel) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "getData (\"", aFilter, "\", \"", aModel, "\")" ]);

	var result = {};
	var pages = this.data.element.Form_PageController().data.pages;
	for (var i = 0; i < pages.length; i++) {
		var data = pages[i].getData(aFilter);
		if (data)
			result = $.extend(result, data);
	}

	if (aModel)
		result = de.titus.form.data.utils.DataUtils.toModel(result, aModel);

	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "getData (\"", aFilter, "\", \"", aModel, "\") -> result: \"", result, "\"" ]);

	return result;
};

Form.prototype.submit = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("submit ()");
	
	return new Promise((function(resolve, reject){
		try {
			if (LOGGER.isDebugEnabled()){
				console.log("object model: ");
				console.log(this.getData("object"));
				console.log("key-value model: ");
				console.log(this.getData("key-value"));
				console.log("list-model model: ");
				console.log(this.getData("list-model"));
				console.log("data-model model: ");
				console.log(this.getData("data-model"));
			}
	
			this.data.state = Constants.STATE.SUBMITTED;
	
			let hasError = false;
			let action = (this.data.element.attr("data-form-action") || "").trim();
			if (action.length > 0) {
				let result = Expression.resolve(action, {
					form : this
				});
				if (typeof result === "function")
					result = result(this);
				
				if(typeof result === "boolean")
					hasError = !result;
			}
	
			if (!hasError) {
				EventUtils.triggerEvent(this.data.element, Constants.EVENTS.STATE_CHANGED);
				EventUtils.triggerEvent(this.data.element, Constants.EVENTS.SUCCESSED);
				resolve();
			} else{
				EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FAILED);
				reject("submit failed");
			}
		} catch (e) {
			LOGGER.logError(e);
			EventUtils.triggerEvent(this.data.element, Constants.EVENTS.FAILED);
			reject(e);
		}
	}).bind(this));
};

export default Form;
