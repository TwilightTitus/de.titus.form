(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.data.utils.ObjectModel", function() {
		var ObjectModel = de.titus.form.data.utils.ObjectModel = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.data.utils.ObjectModel"),

		    toModel : function(aData) {
			    if (ObjectModel.LOGGER.isDebugEnabled())
				    ObjectModel.LOGGER.logDebug([ "toModel(\"", aData, "\"" ]);
			    if (aData === undefined)
				    return;
			    var result;
			    if (typeof aData.$type === "string") {
				    if (aData.$type == "single-field")
					    return aData.value;
				    else
					    return ObjectModel.toModel(aData.value);
			    } else if (Array.isArray(aData)) {
				    result = [];
				    for (var i = 0; i < aData.length; i++)
					    result.push(ObjectModel.toModel(aData[i]));
			    } else if (typeof aData === "object") {
				    result = {};
				    for ( var name in aData)
					    result[name] = ObjectModel.toModel(aData[name]);
			    } else
				    return aData;

			    return result;
		    }
		};
		$.extend(de.titus.form.data.utils.DataUtils, {
			"object" : ObjectModel.toModel
		});
	});

})($);
