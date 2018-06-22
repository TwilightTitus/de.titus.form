(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Registry", function() {
		var Registry = de.titus.form.Registry = {
			LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.Registry"),
			FIELDCONTROLLER : {},
			registFieldController : function(aTypename, aFunction) {
				if(Registry.LOGGER.isDebugEnabled())
					Registry.LOGGER.logDebug("registFieldController (\"" + aTypename + "\")");
				
				Registry.FIELDCONTROLLER[aTypename] = aFunction;
			},
			getFieldController : function(aTypename, aElement){
				if(Registry.LOGGER.isDebugEnabled())
					Registry.LOGGER.logDebug("getFieldController (\"" + aTypename + "\")");
				
				var initFunction = Registry.FIELDCONTROLLER[aTypename];	
				if(initFunction)
					return initFunction(aElement);
				else
					return Registry.FIELDCONTROLLER["default"](aElement);
			}
		};
	});
})();
