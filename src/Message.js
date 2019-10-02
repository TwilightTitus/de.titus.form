// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import ExpressionResolver from "modules/de.titus.core/src/ExpressionResolver";

// own dependencies
import Constants from "./Constants";
import DataContext from "./DataContext";
import DataUtils from "./utils/DataUtils";
import EventUtils from "./utils/EventUtils";
import HtmlStateUtils from "./utils/HtmlStateUtils";
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
	EventUtils.handleEvent(this.data.container.data.element, [ Constants.EVENTS.INITIALIZED, Constants.EVENTS.FIELD_VALUE_CHANGED ], Message.prototype.__doMessage.bind(this));
};

Message.prototype.__doMessage = function(aEvent) {
	if (this.data.timeoutId)
		clearTimeout(this.data.timeoutId);

	this.data.timeoutId = setTimeout(Message.prototype.__doCheck.bind(this, aEvent), 300);
};

Message.prototype.__doCheck = function(aEvent) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__doCheck(\"", aEvent, "\")" ]);

	let data = this.data.container.data.dataContext.getData({
		condition : false,
		validate : true
	});

	data = DataUtils.toModel(data, "object");
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "__doCheck() -> data context: \"", data,
				"\", expression: \"", this.data.expression, "\"" ]);

	let result = EXPRESSION_RESOLVER.resolveExpression(
			this.data.expression, data, false);
	if (result)
		this.data.element.formular_utils_SetActive();
	else
		this.data.element.formular_utils_SetInactive();
};

const MessageBuilder = function(aElement, aContainer, aForm){
	if(aElement instanceof NodeList){		
		let messages = [];
		aElement.forEach(function(aItem){
			messages.push(MessageBuilder(aItem, aContainer, aForm));
		});
		return Promise.all(messages);
	}
	else {
		return new Promise(function(resolve){			
			requestAnimationFrame(function(){
				let message = aElement.data("de.titus.form.Message");
				if(typeof message === "undefined"){
					let expression = (aElement.attr("data-form-message") || "").trim();	
					if(expression.length > 0){
						message = new Message(expression, aElement, aContainer, aForm);
						aElement.data("de.titus.form.Message", message);
					}
				}
				
				resolve(message);
			});
		});
	}
};

export {Message, MessageBuilder};
export default MessageBuilder;
