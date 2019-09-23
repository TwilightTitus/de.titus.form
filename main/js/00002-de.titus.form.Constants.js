(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.Constants", function() {
		de.titus.form.Constants.TYPES = {
		    PAGE : "page",
		    SUMMARY_PAGE : "summary-page",
		    SUBMITTED_PAGE : "submitted-page"
		};

		de.titus.form.Constants.EVENTS = {
		    INITIALIZED : "form-initialized",
		    SUCCESSED : "form-successed",
		    FAILED : "form-failed",
		    STATE_CHANGED : "form-state-changed",

		    ACTION_RESET : "form-action-reset",
		    ACTION_SUBMIT : "form-action-submit",
		    ACTION_PAGE_BACK : "form-action-page-back",
		    ACTION_PAGE_NEXT : "form-action-page-next",
		    ACTION_SUMMARY : "form-action-page-summary",
		    ACTION_LIST_FIELD_ADD : "form-action-list-field-add",
		    ACTION_LIST_FIELD_REMOVE : "form-action-list-field-remove",

		    PAGE_INITIALIZED : "form-page-initialized",
		    PAGE_CHANGED : "form-page-changed",
		    PAGE_SHOW : "form-page-show",
		    PAGE_HIDE : "form-page-hide",
		    PAGE_SUMMARY : "form-page-summary",
		    PAGE_SUBMITTED : "form-page-submitted",

		    FIELD_VALIDATED : "form-field-validated",
		    FIELD_SHOW : "form-field-show",
		    FIELD_HIDE : "form-field-hide",
		    FIELD_SUMMARY : "form-field-SUMMARY",
		    FIELD_VALUE_CHANGED : "form-field-value-changed",

		    VALIDATION_STATE_CHANGED : "form-validation-state-changed",
		    VALIDATION_VALID : "form-validation-valid",
		    VALIDATION_INVALID : "form-validation-invalid",

		    CONDITION_STATE_CHANGED : "form-condition-state-changed",
		    CONDITION_MET : "form-condition-met",
		    CONDITION_NOT_MET : "form-condition-not-met",

		    BUTTON_INACTIVE : "form-button-inactive",
		    BUTTON_ACTIVE : "form-button-active",
		};

		de.titus.form.Constants.STATE = {
		    INPUT : "form-state-input",
		    SUBMITTED : "form-state-submitted",
		};

		de.titus.form.Constants.ATTRIBUTE = {
		    VALIDATION : "-validation",
		    VALIDATION_FAIL_ACTION : "-validation-fail-action",
		    CONDITION : "-condition",
		    MESSAGE : "-message"
		};

		de.titus.form.Constants.SPECIALSTEPS = {
		    START : "form-step-start",
		    SUMMARY : "form-step-summary",
		    SUBMITTED : "form-step-submitted"
		};

		de.titus.form.Constants.STRUCTURELEMENTS = {
		    FORM : {
			    selector : "[data-form]"
		    },
		    PAGE : {
			    selector : "[data-form-page]"
		    },
		    SINGLEFIELD : {
			    selector : "[data-form-field]"
		    },
		    CONTAINERFIELD : {
			    selector : "[data-form-container-field]"
		    },
		    LISTFIELD : {
			    selector : "[data-form-list-field]"
		    },
		};

	});
})();
