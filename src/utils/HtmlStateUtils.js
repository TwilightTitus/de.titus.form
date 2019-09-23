import Constants from "src/Constants";

const ASSOCIATEDELEMENTSELECTOR = (function() {
	let selectors = [];
	for ( let name in Constants.STRUCTURELEMENTS)
		if (Constants.STRUCTURELEMENTS[name].selector)
			selectors.push(Constants.STRUCTURELEMENTS[name].selector);

	return selectors.join(", ");
}());

const doRemoveAddClass = function(aElement, aRemoveClass, anAddClass) {
	aElement.removeClass(aRemoveClass);
	aElement.addClass(anAddClass);
	return aElement;
};
const doSetInitializing = function(aElement) {
	return doRemoveAddClass(aElement, "initialized", "initializing");
};
const doSetInitialized = function(aElement) {
	return doRemoveAddClass(aElement, "initializing", "initialized");
};
const doSetActive = function(aElement) {
	return doRemoveAddClass(aElement, "inactive", "active");
};
const doSetInactive = function(aElement) {
	return doRemoveAddClass(aElement, "active", "inactive");
};
const doSetValid = function(aElement) {
	return doRemoveAddClass(aElement, "invalid", "valid");
};	
const doSetInvalid = function(aElement) {
	return doRemoveAddClass(aElement, "valid", "invalid");
};
const getAssociatedStructurElement = function(aElement) {
	if (aElement.is(CONSTANTS.ASSOCIATEDELEMENTSELECTOR))
		return aElement;
	else
		return getAssociatedStructurElement(aElement.parent());	
};

const HtmlStateUtils = { 
	doRemoveAddClass : doRemoveAddClass,	
	doSetInitializing : doSetInitializing,	
	doSetInitialized : doSetInitialized,
	doSetActive : doSetInitialized,
	doSetInactive : doSetInactive,
	doSetValid : doSetValid,
	doSetInvalid : doSetInvalid,
	getAssociatedStructurElement : getAssociatedStructurElement
};

export default HtmlStateUtils;