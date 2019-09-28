// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import ExpressionResolver from "modules/de.titus.core/src/ExpressionResolver";

// own dependencies
import Constants from "./Constants";
import DataContext from "./DataContext";
import DataUtils from "./utils/DataUtils";
import EventUtils from "./utils/EventUtils";
import HtmlStateUtil from "./utils/HtmlStateUtils";
import FieldUtils from "./fields/FieldUtils";



const LOGGER = LoggerFactory.newLogger("de.titus.form.Condition");
const EXPRESSION_RESOLVER = ExpressionResolver.DEFAULT;
const Condition = function(aExpression, aElement, aContainer, aForm) { 
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
	    element : aElement,
	    form : aForm,
	    container : aContainer,
	    expression : aExpression,
	    timeoutId : undefined
	};
	

	EventUtils.handleEvent(this.data.form.data.element, [ Constants.EVENTS.CONDITION_STATE_CHANGED, Constants.EVENTS.VALIDATION_STATE_CHANGED, Constants.EVENTS.FIELD_VALIDATED ], Condition.prototype.__doCondition.bind(this));
	EventUtils.handleEvent(this.data.element, [ Constants.EVENTS.INITIALIZED ], Condition.prototype.__doCheck.bind(this));
	EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_MET);
};

Condition.prototype.__doCondition = function(aEvent) {
	if (this.data.timeoutId)
		clearTimeout(this.data.timeoutId);

	this.data.timeoutId = setTimeout(Condition.prototype.__doCheck.bind(this, aEvent), 100);
};

Condition.prototype.__doCheck = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__doCheck(\"", aEvent, "\") -> expression: \"", this.data.expression, "\", element: \"", this.data.element, "\", this: \"", this, "\"" ]);

	aEvent.preventDefault();
	if (aEvent.type != Constants.EVENTS.INITIALIZED && aEvent.type != Constants.EVENTS.FIELD_VALUE_CHANGED)
		aEvent.stopPropagation();

	if (aEvent.currentTarget == this.data.element && (aEvent.type == Constants.EVENTS.CONDITION_STATE_CHANGED || aEvent.Type == Constants.EVENTS.VALIDATION_STATE_CHANGED || aEvent.type == Constants.EVENTS.FIELD_VALIDATED))
		; // IGNORE CONDTION_STATE_CHANGE AND VALIDATION_STATE_CHANGED
	// ON SELF
	else if (this.data.expression === "")
		EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_MET);
	else {
		let data = this.data.container.data.dataContext.getData({
		    condition : true,
		    validate : false
		});

		data = DataUtils.toModel(data, "object");
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug([ "__doCheck() -> data: \"", data, "\", expression: \"", this.data.expression, "\"" ]);

		let result = EXPRESSION_RESOLVER.resolveExpression(this.data.expression, data, false);
		if (result)
			EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_MET);
		else
			EventUtils.triggerEvent(this.data.element, Constants.EVENTS.CONDITION_NOT_MET);
	}
};

const ConditionBuilder = function(aElement, aContainer, aForm){
	return new Promise(function(resolve){		
		requestAnimationFrame(function(){
			let expression = (aElement.attr("data-form-condition") || "").trim();
			if(typeof expression !== "undefined")		
				resolve(new Condition(expression, aElement, aContainer, aForm));
		});
	});
};

export {Condition, ConditionBuilder};
export default ConditionBuilder;

