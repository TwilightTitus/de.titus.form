// dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

//own dependencies
import DataUtils from "./DataUtils";

const LOGGER = LoggerFactory.newLogger("de.titus.form.utils.ObjectModelConverter");
const ObjectModelConverter = function(aData) {
    if (LOGGER.isDebugEnabled())
	    LOGGER.logDebug([ "ObjectModelConverter(\"", aData, "\"" ]);
    if (typeof aData === "undefined")
	    return;
    let result;
    if (typeof aData.$type === "string") {
	    if (aData.$type == "single-field")
		    return aData.value;
	    else
		    return ObjectModelConverter(aData.value);
    } else if (Array.isArray(aData)) {
	    result = [];
	    for (let i = 0; i < aData.length; i++)
		    result.push(ObjectModelConverter(aData[i]));
    } else if (typeof aData === "object") {
	    result = {};
	    for ( let name in aData)
		    result[name] = ObjectModelConverter(aData[name]);
    } else
	    return aData;

    return result;
};
DataUtils.addConverter("object", ObjectModelConverter);

export default ObjectModelConverter;

