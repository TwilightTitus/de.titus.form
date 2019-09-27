// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

const LOGGER = LoggerFactory.newLogger("de.titus.form.Registry");
const FIELDCONTROLLER = {};
const Registry = {
	registFieldController : function(aTypename, aFunction) {
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug("registFieldController (\"" + aTypename + "\")");

		FIELDCONTROLLER[aTypename] = aFunction;
	},
	getFieldController : function(aTypename, aElement) {
		if (LOGGER.isDebugEnabled())
			LOGGER.logDebug("getFieldController (\"" + aTypename + "\")");

		let initFunction = FIELDCONTROLLER[aTypename];
		if (initFunction)
			return initFunction(aElement);
		else
			return FIELDCONTROLLER["default"](aElement);
	}
};

export default Registry;


