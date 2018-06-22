(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.data.utils.DataUtils", function() {
		var DataUtils = de.titus.form.data.utils.DataUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.data.utils.DataUtils"),

		    toModel : function(aData, aModel) {
			    if (DataUtils.LOGGER.isDebugEnabled())
				    DataUtils.LOGGER.logDebug([ "toModel (\"", aData, "\", \"", aModel, "\")" ]);

			    var model = aModel.toLowerCase().trim();
			    if (typeof DataUtils[model] === "function")
				    return DataUtils[model](aData);
			    return aData;
		    }
		};
	});

})($);
