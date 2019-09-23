(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.utils.JQueryFunctions", function() {

		var CONSTANTS = de.titus.form.utils.JQueryFunctions = {};
		CONSTANTS.ASSOCIATEDELEMENTSELECTOR = (function(ELEMENTS) {
			var selectors = [];
			for ( var name in ELEMENTS)
				if (ELEMENTS[name].selector)
					selectors.push(ELEMENTS[name].selector);

			return selectors.join(", ");
		}(de.titus.form.Constants.STRUCTURELEMENTS));

		$.fn.formular_utils_RemoveAddClass = function(aRemoveClass, anAddClass) {
			if (this.length === 0)
				return;
			else if (this.length > 1) {
				this.each(function() {
					$(this).formular_utils_RemoveAddClass(aRemoveClass, anAddClass);
				});
			} else {
				this.removeClass(aRemoveClass);
				this.addClass(anAddClass);
			}
			return this;
		};

		$.fn.formular_utils_SetInitializing = function() {
			return this.formular_utils_RemoveAddClass("initialized", "initializing");
		};

		$.fn.formular_utils_SetInitialized = function() {
			return this.formular_utils_RemoveAddClass("initializing", "initialized");
		};

		$.fn.formular_utils_SetActive = function() {
			return this.formular_utils_RemoveAddClass("inactive", "active");
		};

		$.fn.formular_utils_SetInactive = function() {
			return this.formular_utils_RemoveAddClass("active", "inactive");
		};

		$.fn.formular_utils_SetValid = function() {
			return this.formular_utils_RemoveAddClass("invalid", "valid");
		};

		$.fn.formular_utils_SetInvalid = function() {
			return this.formular_utils_RemoveAddClass("valid", "invalid");
		};

		$.fn.formular_field_utils_getAssociatedStructurElement = function() {
			if (this.length == 1) {
				if (this.is(CONSTANTS.ASSOCIATEDELEMENTSELECTOR))
					return this;
				else
					return this.parent().formular_field_utils_getAssociatedStructurElement();
			}
		};

	});
})($);
