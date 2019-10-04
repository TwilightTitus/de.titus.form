// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

// own dependencies
import Constants from "./Constants";
import DataContext from "./DataContext";
import EventUtils from "./utils/EventUtils";
import HtmlStateUtil from "./utils/HtmlStateUtils";
import FieldUtils from "./fields/FieldUtils";

const CLASSNAME = "de.titus.form.Page";
const LOGGER = LoggerFactory.newLogger(CLASSNAME);


const Page = function(aElement, aForm){
    if (LOGGER.isDebugEnabled())
        LOGGER.logDebug("constructor");
    this.data = {
        element : aElement,
        form : aForm,
        dataContext : undefined,
        type : Constants.TYPES.PAGE,
        name : aElement.attr("data-form-page"),
        step : (aElement.attr("data-form-step") || "").trim(),
        active : false,
        condition : undefined,
        valid : false,
        fields : []
    };
    
   this.data.dataContext = new DataContext(this.data.element, {
        data : Page.prototype.getData.bind(this),
        scope : "$page"
   });
   
   
   EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_MET, Constants.EVENTS.CONDITION_NOT_MET ], Page.prototype.__changeConditionState.bind(this));
   EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.CONDITION_STATE_CHANGED, Constants.EVENTS.VALIDATION_STATE_CHANGED ], Page.prototype.doValidate.bind(this));
   
   EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_ACTIVE], Page.prototype.__active.bind(this));
   EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_ACTIVE_SUMMARY], Page.prototype.__summary.bind(this));
   EventUtils.handleEvent(this.data.element, [Constants.EVENTS.STATE_INACTIVE], Page.prototype.__inactive.bind(this));
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

Page.prototype.doValidate = function() {
	if(LOGGER.isDebugEnabled())
		LOGGER.logDebug("doValidate()");
	
	let args = Array.from(arguments);	
	if(args[0] instanceof Event)
		 args.shift().preventDefault();
	
	let force = !!args.shift;
	if (force) {
		let oldValid = this.data.valid;
		this.data.valid = (function(){
		    for (let i = 0; i < this.data.fields.length; i++) {
			    let field = this.data.fields[i];
			    let valid = force ? field.doValidate(force) : field.data.valid;
			    if (!valid)
				    return false;
		    }
		    return true;
		}).call(this);
		if (oldValid != this.data.valid) {
			if (this.data.valid)
				HtmlStateUtil.doSetValid(this.data.element);
			else
				HtmlStateUtil.doSetInvalid(this.data.element);
		            
			EventUtils.triggerEvent(this.data.element, Constants.EVENTS.VALIDATION_STATE_CHANGED);
		 }
	 }

	 EventUtils.triggerEvent(this.data.element, Constants.EVENTS.PAGE_VALIDATED);
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

    let result;
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

const PageBuilder = function(aElement, aForm){    
    return new Promise(function(resolve){
        requestAnimationFrame(function() {
        	let page = aElement.data(CLASSNAME);
        	if(typeof page === "undefined"){        	
	        	page = new Page(aElement, aForm);
	        	FieldUtils.buildChildFields(aElement,page,aForm)
	    		.then(function(theFields){
	    			page.data.fields = theFields;
		        	aElement.data(CLASSNAME, aPage);
		        	resolve(page);
		            EventUtils.triggerEvent(aElement, Constants.EVENTS.PAGE_INITIALIZED);
		        });
        	}
        	else
        		resolve(page);        	
        });
    });
};

export { Page, PageBuilder};
export default PageBuilder;


