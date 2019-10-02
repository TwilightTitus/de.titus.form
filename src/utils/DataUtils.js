// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";


const LOGGER = LoggerFactory.newLogger("de.titus.form.utils.DataUtils");
const DATA_MODEL_CONVERTER = {};
const DataUtils = {
	addConverter: function(aName, aFunction){
		DATA_MODEL_CONVERTER[aName] = aFunction;
	},
    toModel: function(aData, aModel) {
	    if (LOGGER.isDebugEnabled())
		    LOGGER.logDebug([ "toModel (\"", aData, "\", \"", aModel, "\")" ]);

	    let model = (aModel || "object").toLowerCase().trim();
	    if (typeof DATA_MODEL_CONVERTER[model] === "function")
		    return DATA_MODEL_CONVERTER[model](aData);
	    return aData;
    }
};
export default DataUtils;