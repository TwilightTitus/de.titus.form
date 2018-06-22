(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.FormularUtils", function() {
		var FormularUtils = de.titus.form.utils.FormularUtils = {
		    LOGGER : de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.utils.FormularUtils"),

		    getFormularElement : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getFormularElement()");

			    if (aElement.is("[data-form]"))
				    return aElement;
			    else
				    return aElement.parents("[data-form]").first();
		    },
		    getFormular : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getFormular()");

			    var formularElement = FormularUtils.getFormularElement(aElement);
			    if (formularElement)
				    return formularElement.Formular();
		    },

		    getPage : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getPage()");

			    if (aElement.is("[data-form]"))
				    return undefined;
			    else if (aElement.is("[data-form-page]"))
				    return aElement.formular_Page();
			    else {
				    var parent = aElement.parents("[data-form-page]").first();
				    if (parent.length == 1)
					    return parent.formular_Page();
			    }
		    },
		    getField : function(aElement) {
			    if (FormularUtils.LOGGER.isDebugEnabled())
				    FormularUtils.LOGGER.logDebug("getField()");
			    if (aElement.is("[data-form]"))
				    return undefined;
			    else if (aElement.is("[data-form-field]"))
				    return aElement.formular_Field();
			    else {
				    var parent = aElement.parents("[data-form-field]").first();
				    if (parent.length == 1)
					    return parent.formular_Field();
			    }
		    },

		    isFieldsValid : function(theFields, force) {
			    if (typeof theFields !== 'undefined' && theFields.length > 0) {
				    for (var i = 0; i < theFields.length; i++) {
					    var field = theFields[i];
					    var valid = force ? field.doValidate(force) : field.data.valid;
					    if (!valid)
						    return false;
				    }
			    }

			    return true;
		    },

		    toBaseModel : function(theFields, aFilter, aContainer) {
			    var result = aContainer || {};
			    for (var i = 0; i < theFields.length; i++) {
				    var data = theFields[i].getData(aFilter);
				    if (Array.isArray(data))
					    FormularUtils.toBaseModel(data, result);
				    else if (data && data.value)
					    result[data.name] = data;
			    }
			    return result;
		    }
		};
	});

})($);
