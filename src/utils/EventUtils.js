import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";
import Constants from "src/Constants";


const LOGGER = LoggerFactory.newLogger("de.titus.form.utils.EventUtils");
const checkOfUndefined = function(aValue) {
	if (typeof aValue === "undefined")
		throw new Error("Error: undefined value");
	else if (Array.isArray(aValue)){
		for (let i = 0; i < aValue.length; i++)
			if (aValue[i] === undefined)
				throw new Error("Error: undefined value at array index \""	+ i + "\"");
	} 
};


const EventUtils = {
	triggerEvent : function(aElement, aEvent, aData) {
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug(["triggerEvent(\"", aEvent , "\")"]);

		checkOfUndefined(aEvent);
		requestAnimationFrame((function(aEvent, aData) {
			if (LOGGER.isDebugEnabled())
				LOGGER.logDebug([ "fire event event \"", aEvent,	"\"\non ", this, "\nwith data \"" + aData + "\"!" ]);
			this.trigger(aEvent, aData);
		}).bind(aElement, aEvent, aData));
	},
	handleEvent : function(aElement, aEvent, aCallback, aSelector) {
		// TODO REFECTORING TO ONE SETTINGS PARAMETER OBJECT
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug([ "handleEvent \"", aEvent, "\"\nat ", aElement, "\nwith selector ", aSelector ]);

		checkOfUndefined(aEvent);
		if(aEvent instanceof Array)		
		    aElement.on(aEvent.join(", "), aSelector, aCallback);
		else
		    aElement.on(aEvent, aSelector, aCallback);
	}
};

export default EventUtils;
