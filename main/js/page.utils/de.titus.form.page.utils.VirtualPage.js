(function($) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.page.utils.VirtualPage", function() {
		var Page = de.titus.form.page.utils.VirtualPage = function(aElement, theOptions) {
			this.data = {
			    element : aElement,
			    pageController : theOptions.pageController,
			    type : theOptions.type,
			    valid : true,
			    condition : true,
			    step : theOptions.step,
			    event : theOptions.event
			};
		};

		Page.prototype.show = function() {
			var pages = this.data.pageController.data.pages;
			for (var i = 0; i < pages.length; i++)
				pages[i].summary();

			de.titus.form.utils.EventUtils.triggerEvent(this.data.element, this.data.event);
		};

		Page.prototype.hide = function() {
			var pages = this.data.pageController.data.pages;
			for (var i = 0; i < pages.length; i++)
				pages[i].hide();

		};

		Page.prototype.doValidate = function() {
			return true;
		};
	});
})($);
