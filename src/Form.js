import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import ExpressionResolver from "modules/de.titus.core/src/ExpressionResolver";
import DataContext from "src/DataContext";
import EventUtils from "src/utils/EventUtils";
import HtmlStateUtils from "src/utils/HtmlStateUtils";

const LOGGER = LoggerFactory.getInstance().newLogger("de.titus.form.Form");
const Expression =  ExpressionResolver.DEFAULT;


const Form = function(aElement) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
	    element : aElement,
	    name : aElement.attr("data-form"),
	    state : Constants.STATE.INPUT
	};

	new DataContext(aElement, {
		data : Form.prototype.getData.bind(this)
	});

	HtmlStateUtils.doSetInitializing();
	requestAnimationFrame(Form.prototype.__init.bind(this));
};

Form.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("init()");

	EventUtils.handleEvent(this.data.element, [ EVENTTYPES.ACTION_SUBMIT ], Form.prototype.submit.bind(this));

	this.data.pageController = new PageController(this);
	
	this.data.element.Form_StepPanel();
	this.data.element.Form_FormControls();
	this.data.element.Form_initMessages();

	requestAnimationFrame((function() {
		EventUtils.triggerEvent(this.data.element, EVENTTYPES.INITIALIZED);
		HtmlStateUtils.doSetInitialized();
	}).bind(this));
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
				EventUtils.triggerEvent(this.data.element, EVENTTYPES.STATE_CHANGED);
				EventUtils.triggerEvent(this.data.element, EVENTTYPES.SUCCESSED);
				resolve();
			} else{
				EventUtils.triggerEvent(this.data.element, EVENTTYPES.FAILED);
				reject("submit failed");
			}
		} catch (e) {
			LOGGER.logError(e);
			EventUtils.triggerEvent(this.data.element, EVENTTYPES.FAILED);
			reject(e);
		}
	}).bind(this));
};
