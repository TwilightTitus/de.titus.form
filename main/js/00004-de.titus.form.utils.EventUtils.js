(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.EventUtils", function() {
		var EventUtils = de.titus.form.utils.EventUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.utils.EventUtils"),
		    triggerEvent : function(aElement, aEvent, aData) {
			    if (EventUtils.LOGGER.isDebugEnabled())
				    EventUtils.LOGGER.logDebug("triggerEvent(\"" + aEvent + "\")");

			    EventUtils.__checkOfUndefined(aEvent);

			    setTimeout((function(aEvent, aData) {
				    if (EventUtils.LOGGER.isDebugEnabled())
					    EventUtils.LOGGER.logDebug([ "fire event event \"", aEvent, "\"\non ", this, "\nwith data \"" + aData + "\"!" ]);
				    this.trigger(aEvent, aData);
			    }).bind(aElement, aEvent, aData), 1);
		    },
		    handleEvent : function(aElement, aEvent, aCallback, aSelector) {
			    // TODO REFECTORING TO ONE SETTINGS PARAMETER OBJECT

			    if (EventUtils.LOGGER.isDebugEnabled())
				    EventUtils.LOGGER.logDebug([ "handleEvent \"", aEvent, "\"\nat ", aElement, "\nwith selector ", aSelector ]);

			    EventUtils.__checkOfUndefined(aEvent);

			    if (Array.isArray(aEvent))
				    aElement.on(aEvent.join(" "), aSelector, aCallback);
			    else
				    aElement.on(aEvent, aSelector, aCallback);
		    },
		    __checkOfUndefined : function(aValue) {
			    if (Array.isArray(aValue))
				    for (var i = 0; i < aValue.length; i++)
					    if (aValue[i] === undefined)
						    throw new Error("Error: undefined value at array index \"" + i + "\"");
					    else if (aValue === undefined)
						    throw new Error("Error: undefined value");
		    }

		};
	});

})($);
