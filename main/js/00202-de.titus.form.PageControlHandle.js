(function() {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.PageControlHandle", function() {
		var PageControlHandle = de.titus.form.PageControlHandle = function(aPage, aIndex, aStep, aPageController) {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("constructor");
			this.data = {
			    index : aIndex,
			    page : aPage,
			    step : aStep,
			    pageController : aPageController
			};
		};
		
		PageControlHandle.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.PageControlHandle");
		
		PageControlHandle.prototype.hide = function() {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("hide ()");
			if (this.data.page && this.data.page.hide)
				this.data.page.hide();
			
		};
		
		PageControlHandle.prototype.show = function() {
			if (PageControlHandle.LOGGER.isDebugEnabled())
				PageControlHandle.LOGGER.logDebug("show ()");
			if (this.data.page && this.data.page.show)
				this.data.page.show();
		};
	});
})($);
