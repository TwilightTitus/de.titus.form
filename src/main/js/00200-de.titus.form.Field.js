(function($, ELEMENTS) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Field", function() {
		var Field = de.titus.form.Field = {
			FIELDSELECTORS : [ ELEMENTS.SINGLEFIELD.selector, ELEMENTS.CONTAINERFIELD.selector, ELEMENTS.LISTFIELD.selector ].join(", ")
		};

		$.fn.formular_field_utils_getSubFields = function() {
			var result = [];
			this.children().each(function() {
				var element = $(this);
				if (element.is(Field.FIELDSELECTORS))
					result.push(element.formular_Field());
				else {
					var subFields = element.formular_field_utils_getSubFields();
					if (subFields)
						Array.prototype.push.apply(result, subFields);
				}
			});

			return result;
		};

		$.fn.formular_field_utils_getAssociatedField = function() {
			var field = this.formular_Field();
			if (field)
				return field;

			return this.parent().formular_field_utils_getAssociatedField();
		};

		$.fn.formular_Field = function() {
			if (this.length === 0)
				return;
			else if (this.length > 1) {
				var result = [];
				this.each(function() {
					var field = $(this).formular_Field();
					if (field)
						result.push(field);
				});

				return result;
			} else {
				var field = this.data("de.titus.form.Field");
				if (!field) {
					if (this.is("[data-form-field]"))
						field = new de.titus.form.fields.SingleField(this);
					else if (this.is("[data-form-container-field]"))
						field = new de.titus.form.fields.ContainerField(this);
					else if (this.is("[data-form-list-field]"))
						field = new de.titus.form.fields.ListField(this);

					if (field)
						this.data("de.titus.form.Field", field);
				}

				return field;
			}
		};
	});
})($, de.titus.form.Constants.STRUCTURELEMENTS);
