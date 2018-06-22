(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.ValidationExpression", function() {
		var ValidationExpression = de.titus.form.ValidationExpression = function(aElement) {
			if (ValidationExpression.LOGGER.isDebugEnabled())
				ValidationExpression.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    expression : (aElement.attr("data-form-validation") || "").trim(),
			    expressionResolver : new de.titus.core.ExpressionResolver()
			};
		};

		ValidationExpression.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.ValidationExpression");

		ValidationExpression.prototype.doValidate = function(aContext) {
			if (ValidationExpression.LOGGER.isDebugEnabled())
				ValidationExpression.LOGGER.logDebug([ "doValidate() -> expression: \"", this.data.expression, "\"" ]);
			if (this.data.expression !== "")
				return this.data.expressionResolver.resolveExpression(this.data.expression, aContext, false);

			return true;
		};

		de.titus.core.jquery.Components.asComponent("formular_ValidationExpression", de.titus.form.ValidationExpression);
	});
})();
