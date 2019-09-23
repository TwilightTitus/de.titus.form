import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

const LOGGER = LoggerFactory.newLogger("de.titus.form.DataContext");

const DataContext = function(aElement, aOption) {
	this.data = {
	    element : aElement,
	    data : aOption.data,
	    scope : aOption.scope,
	    parentContext : undefined,
	    init : false
	};
	aElement.data("de.titus.form.DataContext", this);
	aElement.attr("data-form-data-context", "");
};
DataContext.prototype.getParentContext = function() {
	if (!this.data.init) {
		this.data.parentContext = DataContext.findParentContext(this.data.element);
		this.data.init = true;
	}

	return this.data.parentContext;
};
DataContext.prototype.getData = function(aFilter) {
	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug("getData (\"", aFilter, "\")");

	let context = this.getParentContext() ? this.getParentContext().getData(aFilter) : {};
	let data = typeof this.data.data === "function" ? this.data.data(aFilter) : this.data.data;
	if (data) {
		if (this.data.scope)
			context[this.data.scope] = data;
		else
			$.extend(context, data);//TODO build own function
	}

	if (LOGGER.isDebugEnabled())
		LOGGER.logDebug([ "getData() -> nativ data: ", context ]);

	return context;
};

DataContext.getContext = function(aElement) {
	return aElement.data("de.titus.form.DataContext");
};

DataContext.findContext = function(aElement) {
    
    //TODO Optimize and Test with DataContext.getContext(aElement.parent("[data-form-data-context] | [data-form]"));
	if (typeof aElement.attr("data-form-data-context") !== "undefined"|| typeof this.attr("data-form") !== "undefined")
		return DataContext.getContext(aElement);
	else
		return DataContext.findContext(aElement.parent());
};

DataContext.findParentContext = function(aElement) {
	return findContext(aElement.parent());
};

export default DataContext;
