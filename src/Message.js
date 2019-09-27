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

const LOGGER = LoggerFactory.newLogger("de.titus.form.Message");
const EXPRESSION_RESOLVER = ExpressionResolver.DEFAULT;

const Message = function(aExpression, aElement, aContainer, aForm) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("constructor");

	this.data = {
		element : aElement,
		container : aContainer,
		form : aForm,
		expression : aExpression,
		timeoutId : undefined
	};
	HtmlStateUtils.doSetInactive(this.data.element);
	setTimeout(Message.prototype.__init.bind(this), 1);
};

Message.prototype.__init = function() {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("__init()");
	
	utils.EventUtils.handleEvent(this.data.container.data.element, [ EVENTTYPES.INITIALIZED, EVENTTYPES.FIELD_VALUE_CHANGED ], Message.prototype.__doMessage.bind(this));
};

Message.prototype.__doMessage = function(aEvent) {
	if (this.data.timeoutId)
		clearTimeout(this.data.timeoutId);

	this.data.timeoutId = setTimeout(Message.prototype.__doCheck.bind(this,
			aEvent), 300);
};

Message.prototype.__doCheck = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__doCheck(\"", aEvent, "\")" ]);

	var data = this.data.dataContext.getData({
		condition : false,
		validate : true
	});

	data = data.utils.DataUtils.toModel(data, "object");
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__doCheck() -> data context: \"", data,
				"\", expression: \"", this.data.expression, "\"" ]);

	var result = this.data.expressionResolver.resolveExpression(
			this.data.expression, data, false);
	if (result)
		this.data.element.formular_utils_SetActive();
	else
		this.data.element.formular_utils_SetInactive();
};

$.fn.formular_initMessages = function() {
	return this.find("[data-form-message]").formular_Message();
};


const MessageBuilder = function(aElement, aContainer, aForm){	
	return new Promise(function(resolve){
		let expression = aElement.attr("data-form-message") || "").trim();	
		if(typeof expression !== "undefined")
			requestAnimationFrame((function(){				
				resolve(this);
			}).bind(new Message(expression, aElement, aContainer, aForm)));
	});	
};

export {Message, MessageBuilder};
export default MessageBuilder;
