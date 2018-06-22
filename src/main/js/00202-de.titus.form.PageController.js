(function($, EVENTTYPES) {
	"use strict";
	de.titus.core.Namespace.create("de.titus.form.PageController", function() {
		var PageController = de.titus.form.PageController = function(aElement) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("constructor");

			this.data = {
			    element : aElement,
			    pages : [],
			    pageHandles : [],
			    currentHandle : undefined
			};

			setTimeout(PageController.prototype.__init.bind(this), 1);
		};

		PageController.LOGGER = de.titus.logging.LoggerFactory.getInstance().newLogger("de.titus.form.PageController");

		PageController.prototype.__init = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__init()");

			var formularElement = this.data.element;
			this.data.pages = this.data.element.find("[data-form-page]").formular_Page();
			if(typeof this.data.pages === 'undefined')
				this.data.pages = [];
			else if (!Array.isArray(this.data.pages))
				this.data.pages = [ this.data.pages ];

			this.data.pageHandles = this.__initPageHandles();

			de.titus.form.utils.EventUtils.handleEvent(this.data.element, EVENTTYPES.ACTION_PAGE_BACK, PageController.prototype.toPrevPage.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, [ EVENTTYPES.ACTION_PAGE_NEXT, EVENTTYPES.ACTION_SUMMARY, EVENTTYPES.ACTION_SUBMIT ], PageController.prototype.toNextPage.bind(this));
			de.titus.form.utils.EventUtils.handleEvent(this.data.element, EVENTTYPES.CONDITION_STATE_CHANGED, PageController.prototype.__checkCurrentPage.bind(this));
		};

		PageController.prototype.__initPageHandles = function() {
			var handles = [];
			var index = 0;
			var lastStep = de.titus.form.Constants.SPECIALSTEPS.START;
			for (var i = 0; i < this.data.pages.length; i++) {
				var page = this.data.pages[i];
				if (page.data.step !== "")
					lastStep = page.data.step;
				else
					page.data.step = lastStep;

				page.hide();

				var handle = new de.titus.form.PageControlHandle(page, i, lastStep, this);

				handles.push(handle);
			}

			var summaryPage = new de.titus.form.page.utils.VirtualPage(this.data.element, {
			    pageController : this,
			    type : de.titus.form.Constants.TYPES.SUMMARY_PAGE,
			    step : de.titus.form.Constants.SPECIALSTEPS.SUMMARY,
			    event : EVENTTYPES.PAGE_SUMMARY
			});
			handles.push(new de.titus.form.PageControlHandle(summaryPage, handles.length, summaryPage.data.step, this));

			var submittedPage = new de.titus.form.page.utils.VirtualPage(this.data.element, {
			    pageController : this,
			    type : de.titus.form.Constants.TYPES.SUBMITTED_PAGE,
			    step : de.titus.form.Constants.SPECIALSTEPS.SUBMITTED,
			    event : EVENTTYPES.PAGE_SUBMITTED
			});
			handles.push(new de.titus.form.PageControlHandle(submittedPage, handles.length, submittedPage.data.step, this));

			return handles;
		};

		PageController.prototype.__checkCurrentPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__checkCurrentPage()");
			if (!this.data.currentHandle && this.data.pageHandles[0].data.page.data.condition)
				this.__toPageHandle(this.data.pageHandles[0]);

		};

		PageController.prototype.isFirstPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("isFirstPage()");
			return this.data.currentHandle && this.data.currentHandle.data.index === 0;
		};

		PageController.prototype.getCurrentPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("getCurrentPage()");

			if (this.data.currentHandle)
				return this.data.currentHandle.data.page;
		};

		PageController.prototype.getNextPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("getNextPage()");

			return this.__getNextPageHandle().data.page;
		};

		PageController.prototype.hasNextPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("hasNextPage()");

			return this.__getNextPageHandle() !== undefined;
		};

		PageController.prototype.__getNextPageHandle = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__getNextPageHandle()");

			if (!this.data.currentHandle)
				return;
			else if (!this.data.currentHandle.data.page.doValidate(true))
				return this.data.currentHandle;
			else {
				for (var i = this.data.currentHandle.data.index + 1; i < this.data.pageHandles.length; i++) {
					var handle = this.data.pageHandles[i];
					if (handle.data.page.data.condition)
						return handle;
				}
				return this.data.currentHandle;
			}
		};

		PageController.prototype.__getPrevPageHandle = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__getPrevPageHandle()");

			if (!this.data.currentHandle)
				return this.data.pageHandles[0];
			else {
				for (var i = this.data.currentHandle.data.index - 1; 0 <= i; i--) {
					var handle = this.data.pageHandles[i];
					if (handle.data.page.data.condition)
						return handle;
				}
				return this.data.currentHandle;
			}
		};

		PageController.prototype.__toPageHandle = function(aPageHandle) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("__toPage()");

			if (aPageHandle) {
				if (this.data.currentHandle) {
					this.data.element.removeClass("step-" + this.data.currentHandle.data.step);
					this.data.currentHandle.hide();
				}

				this.data.currentHandle = aPageHandle;
				this.data.element.addClass("step-" + this.data.currentHandle.data.step);
				this.data.currentHandle.show();

				de.titus.form.utils.EventUtils.triggerEvent(this.data.element, EVENTTYPES.PAGE_CHANGED);
			}
		};

		PageController.prototype.toPrevPage = function() {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("toPrevPage()");

			var pageHandle = this.__getPrevPageHandle();
			if (pageHandle)
				this.__toPageHandle(pageHandle);
		};

		PageController.prototype.toNextPage = function(execute) {
			if (PageController.LOGGER.isDebugEnabled())
				PageController.LOGGER.logDebug("toNextPage()");

			var pageHandle = this.__getNextPageHandle();
			if (pageHandle)
				this.__toPageHandle(pageHandle);
		};

		de.titus.core.jquery.Components.asComponent("formular_PageController", de.titus.form.PageController);
	});
})($, de.titus.form.Constants.EVENTS);
