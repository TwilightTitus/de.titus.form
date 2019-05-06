/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dom-api-extension/src/Global.js":
/*!******************************************************!*\
  !*** ./node_modules/dom-api-extension/src/Global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(Global) {
	const parser = new DOMParser();

	Global.find = function() {
		return document.find.apply(document, arguments);
	};

	Global.ready = function() {
		return document.ready.apply(document, arguments);
	};

	Global.create = function() {
		if (typeof arguments[0] !== "string")
			throw new Error("The first argument must be a string!");

		let body = parser.parseFromString(arguments[0].trim(),
				arguments[1] || "text/html").find("body");
		let frag = document.createDocumentFragment();
		let nodes = body.childNodes;
		while (nodes.length != 0)
			frag.append(nodes[0]);

		return frag.childNodes;
	};
})(window || global);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/dom-api-extension/src/JQuery.js":
/*!******************************************************!*\
  !*** ./node_modules/dom-api-extension/src/JQuery.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global */ "./node_modules/dom-api-extension/src/Global.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Global__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dom_HTMLElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/HTMLElement */ "./node_modules/dom-api-extension/src/dom/HTMLElement.js");


(function(Global) {
	/**
	 * JQuery prevent jquery
	 */
	const $ = Global.$ = Global.JQuery = Global.jQuery = Global.$ || function() {
		if (arguments.length == 0)
			return document;
		else if (arguments.length == 1) {			
			if (typeof arguments[0] === "function")
				return Global.ready.apply(Global, arguments);
			else if (typeof arguments[0] === "string") {
				if (/<[^<]+>/g.test(arguments[0]))
					return Global.create.apply(Global, arguments);
				else
					return Global.find.apply(Global, arguments);
			}
			else 
				return arguments[0];
		}
	};
})(window || global);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/Document.js":
/*!************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/Document.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_BasicQuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/BasicQuerySupport */ "./node_modules/dom-api-extension/src/dom/extentions/BasicQuerySupport.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/dom-api-extension/src/dom/extentions/EventSupport.js");
/* harmony import */ var _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/ReadyEventSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ReadyEventSupport.js");





Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Document.prototype, _extentions_BasicQuerySupport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _extentions_ReadyEventSupport__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

document.addEventListener("DOMContentLoaded", function(){
	document.trigger("ready");
});




/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/HTMLElement.js":
/*!***************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/HTMLElement.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_BasicQuerySupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/BasicQuerySupport */ "./node_modules/dom-api-extension/src/dom/extentions/BasicQuerySupport.js");
/* harmony import */ var _extentions_NodeQuerySupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/NodeQuerySupport */ "./node_modules/dom-api-extension/src/dom/extentions/NodeQuerySupport.js");
/* harmony import */ var _extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extentions/HtmlClassSupport */ "./node_modules/dom-api-extension/src/dom/extentions/HtmlClassSupport.js");
/* harmony import */ var _extentions_EventSupport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extentions/EventSupport */ "./node_modules/dom-api-extension/src/dom/extentions/EventSupport.js");
/* harmony import */ var _extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extentions/ShowHideSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ShowHideSupport.js");








Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(HTMLElement.prototype,_extentions_BasicQuerySupport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],_extentions_NodeQuerySupport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],_extentions_HtmlClassSupport__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],_extentions_EventSupport__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],_extentions_ShowHideSupport__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/HTMLInputElement.js":
/*!********************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/HTMLInputElement.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ValueSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(HTMLInputElement.prototype,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/HTMLSelectElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/HTMLSelectElement.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/ValueSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ValueSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(HTMLSelectElement.prototype,_extentions_ValueSupport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/Node.js":
/*!********************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/Node.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extentions/DataSupport */ "./node_modules/dom-api-extension/src/dom/extentions/DataSupport.js");
/* harmony import */ var _extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ManipulationSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ManipulationSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Node.prototype,_extentions_DataSupport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],_extentions_ManipulationSupport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/NodeList.js":
/*!************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/NodeList.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ExtendPrototype */ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js");
/* harmony import */ var _utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DelegaterBuilder */ "./node_modules/dom-api-extension/src/utils/DelegaterBuilder.js");
/* harmony import */ var _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extentions/ListSupport */ "./node_modules/dom-api-extension/src/dom/extentions/ListSupport.js");




Object(_utils_ExtendPrototype__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(NodeList.prototype, _extentions_ListSupport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

Object(_utils_DelegaterBuilder__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(function(aFunctionName, theArguments){
	let nodes = this.values();
	let node = nodes.next();
	let results = [];
	while(node && node.value){
		node = node.value;
		if(typeof node !== "undefined" && typeof node[aFunctionName] === "function"){
			let result = node[aFunctionName].apply(node, theArguments);
			if(typeof result !== "undefined" && result != null){
				if(result instanceof Array)
					results = results.concat(result);
				else if(result instanceof NodeList)
					results = results.concat(Array.from(result));
				else
					results.push(result)
			}		
		}
		node = nodes.next();		
	}
	
	if(results.length == 0)
		return undefined;
	else if(results[0] instanceof Node)
		return NodeList.from(results);
	else
		return results;	
},NodeList.prototype, Node.prototype, HTMLElement.prototype, HTMLInputElement.prototype, Element.prototype);


NodeList.from = function(){
	if(arguments.length == 1 && typeof arguments[0] !== "undefined" &&  arguments[0] instanceof NodeList){
		return arguments[0];		
	}
	else{
		let args = Array.from(arguments);
		let internal = {
			length: {value: 0}
		};
		
		while(args.length > 0){
			let list = Array.from(args.shift());		
			for(let i = 0; i < list.length; i++){
				if(typeof list[i] !== "undefined" && list[i] instanceof Node){
					internal[i] = {value: list[i], enumerable: true};
					internal.length.value++;
				}
			}
		}
	
		return Object.create(NodeList.prototype,internal );
	}
}

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/BasicQuerySupport.js":
/*!********************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/BasicQuerySupport.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {
	const parentSelector = /:parent(\(\"([^\)]*)\"\))?/i;
	
	Prototype.find = function(aSelector) {
		let match = parentSelector.exec(aSelector);
		if(match){
			let result = this;
			if(match.index > 0){
				result = this.querySelectorAll(aSelector.substr(0, match.index));
				if(result.length == 0)
					return;
			}			
			if(typeof match[2] !== "undefined")
				result = result.parent(match[2]);
			else
				result = result.parent();
			
			if(typeof result === "undefined")
				return;
			
			let nextSelector = aSelector.substr(match.index + match[0].length).trim();
			if(nextSelector.trim().length > 0)
				return result.find(nextSelector);
			
			return result;		
		}
		else
			return this.querySelectorAll(aSelector);
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);



/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/DataSupport.js":
/*!**************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/DataSupport.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {
	Prototype.data = function() {
		if (typeof this.__data === "undefined") {
			this.__data = {};
			if(typeof this.dataset !== "undefined")
				for (name in this.dataset)
					this.__data[name] = this.dataset[name];
		}

		if (arguments.length == 0)
			return this.__data;
		else if (arguments.length == 1)
			return this.__data[arguments[0]] ;
		else if (typeof arguments[1] === "undefined" || arguments[1] == null)
			delete this.__data[arguments[0]];
		else
			this.__data[arguments[0]] = arguments[1];
		
		return this;
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/EventSupport.js":
/*!***************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/EventSupport.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _polyfill_CustomEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../polyfill/CustomEvent */ "./node_modules/dom-api-extension/src/polyfill/CustomEvent.js");
/* harmony import */ var _polyfill_CustomEvent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_CustomEvent__WEBPACK_IMPORTED_MODULE_0__);


const support = function(Prototype) {
	const WrappedEventHandler = function(aConfig, aCallback ,aEvent){
		if(typeof aConfig.filter !== "undefined" && !aEvent.target.is(aConfig.filter))		
			return;
		
		let args = [aEvent];
		if(typeof aConfig.data !== "undefined")
			args = args.concat(aConfig.data);
		
		let result = aCallback.apply(aCallback, args);
		if(aConfig.singleCall)
			this.removeEventListener(aCallback);
		
		return result;		
	};
	
	
	const addEventListener = Prototype.addEventListener;
	Prototype.addEventListener = function() {
		if (arguments.length < 2)
			throw new Error("Too less arguments!");

		this.on(arguments[0], arguments[1]);
	};	
	
	Prototype.on = function() {
		if (arguments.length < 2)
			throw new Error("Too less arguments!");
		
		if (typeof this.__callbackMap === "undefined")
			this.__callbackMap = {};

		let args = Array.from(arguments);
		let events = args.shift().split(/(\s+)|(\s*,\s*)/);
		let handlerConfig = {
			filter : (typeof args[0] === "string" ? args.shift().split(/\s*,\s*/) : undefined),
			data : (typeof args[0] !== "function" ? args.shift() : undefined)
		};
	    let callback = args.shift();
	    
	    handlerConfig.singleCall = (typeof args[0] !== "boolean" ? args.shift() : false);

		let eventMap = {};
		events.forEach((function(result, config, callback, event){
			let wrappedEventHandler = WrappedEventHandler.bind(this, config, callback);
			result[event] = wrappedEventHandler;			
			addEventListener.call(this, event, wrappedEventHandler, true);
			
		}).bind(this, eventMap, handlerConfig, callback));
		
		this.__callbackMap[callback] = eventMap;
		
		return this;
	};	
	
	const removeEventListener = Prototype.removeEventListener;
	Prototype.removeEventListener = Prototype.removeOn = function() {
		if (arguments.length != 1 || typeof this.__callbackMap === "undefined")
			return removeEventListener.apply(this, arguments);
			
		let events = undefined;
		let callback = undefined;
		if(typeof arguments[0] === "string")
			events = arguments[0].split(/(\s+)|(\s*,\s*)/);
		else if(typeof arguments[0] === "function")
			callback = arguments[0].shift();
		else
			throw new Error("Wrong argument! -> call function([event|handler])");
		
		let removalHandler = [];
		if(typeof events === "undefined"){
			eventMap = this.__callbackMap[callback];
			if(typeof eventMap !== "undefined"){
				eventMap.getOwnPropertyNames().forEach((function(result, eventMap, event){
					let handler = eventMap[event];
					if(typeof handler !== "undefined")
						result.push(handler);					
				}).bind(this, removalHandler, eventMap));
				
				delete this.__callbackMap[callback];
			}
		}
		else {
			events.forEach((function(result, event){
				Object.getPropertyNames(this.__callbackMap).forEach((function(aEvent, Callback){
					let eventMap = this.__callbackMap[Callback];
					delete eventMap[aEvent];
					if(eventMap.getOwnPropertyNames() == 0)
						delete this.__callbackMap[Callback];
				}).bind(this, event));								
			}).bind(this));
		}
		
		return this;
	};

	
	Prototype.trigger = function(){
		let event = undefined;
		if(typeof this["on" + arguments[0]] === "function"){
			event = document.createEvent("Event");
			event.initEvent(arguments[0], true, true);
		}
		else
			event = new CustomEvent(arguments[0],  { bubbles: true, cancelable: true, detail: arguments[1] });
		
		this.dispatchEvent(event);
		return this;
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);


/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/HtmlClassSupport.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/HtmlClassSupport.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {	
	
	Prototype.addClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach((function(clazz){
				this.classList.add(clazz);
			}).bind(this));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,(function(clazz){
				this.addClass(clazz);
			}).bind(this));
		
		return this;
	};
	
	Prototype.removeClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach((function(clazz){
				this.classList.remove(clazz);
			}).bind(this));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,(function(clazz){
				this.removeClass(clazz);
			}).bind(this));
		
		return this;		
	};
	
	Prototype.toggleClass = function() {
		if(arguments.length == 1)
			arguments[0].split(/\s+/).forEach((function(clazz){
				this.classList.toggle(clazz);
			}).bind(this));
		else if(arguments.length > 1)
			Array.prototype.forEach.call(arguments,(function(clazz){
				this.toogleClass(clazz);
			}).bind(this));
		
		return this;
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/ListSupport.js":
/*!**************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/ListSupport.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {		
	Prototype.indexOf = function() {
		for(let i = 0; i < this.length; i++)
			if(this[i] == arguments[0])
				return i;
		
		return -1;
	};
	
	if(typeof Prototype.forEach === "undefined")
		Prototype.forEach = function(){
			return Array.prototype.forEach.apply(this, arguments);
		};
	
	Prototype.first = function(){
		if(this.length > 0)
			return this[0];
	};	
	
	Prototype.last = function(){
		if(this.length > 0)
			return this[this.length - 1];
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/ManipulationSupport.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/ManipulationSupport.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../polyfill/Array */ "./node_modules/dom-api-extension/src/polyfill/Array.js");
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_Array__WEBPACK_IMPORTED_MODULE_0__);


const support = function(Prototype) {

	Prototype.attr = function() {
		if (arguments.length == 0)
			return this.hasAttributes() ? (function() {
				let result = {};
				this.getAttributeNames().forEach((function(result, name) {
					result[name] = this.getAttribute(name);
				}).bind(this, result));
				return result;
			}).call(this) : undefined;
		else if (arguments.length == 1)
			return this.getAttribute(arguments[0]);
		else if (typeof arguments[1] === "undefined" || arguments[1] == null)
			this.removeAttribute(arguments[0]);
		else
			this.setAttribute(arguments[0], arguments[1]);
		
		return this;
	};
	
	Prototype.empty = function(){
		let nodes = this.childNodes
		while(nodes.length != 0)			
			nodes[0].remove(true);
		
		return this;
	};
	
	Prototype.content = function(){
		return this.childNodes;
	};	
	
	Prototype.html = function(){
		if(arguments.length == 0)			
			return this.innerHTML;
		else if(arguments.length == 1 && typeof arguments[0] === "boolean")
			if(arguments[0])
				return this.outerHTML;
			else
				return this.innerHTML;
		else 
			Array.from(arguments).forEach((function(content){
				if(typeof content === "string")
					this.innerHTML = content;
				else if(content instanceof Element){
					this.empty();
					this.append(content);
				}
			}).bind(this));		
			
		return this;
	};
	
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/NodeQuerySupport.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/NodeQuerySupport.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../polyfill/Array */ "./node_modules/dom-api-extension/src/polyfill/Array.js");
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_Array__WEBPACK_IMPORTED_MODULE_0__);


const support = function(Prototype) {
	
	Prototype.is = function() {
		if(arguments.length == 1){
			if(typeof arguments[0] === "string")
				return this.matches(arguments[0]);
			else if(typeof arguments[0].length === "number"){
				let filter = arguments[0];
				for(let i = 0; i < filter.length; i++)
					if(this.matches(filter[i]))
						return true;
			}				
		}
		else if(arguments.length > 1)
			return this.is(Array.from(arguments));
		
		return false;
	};	
	
	Prototype.parent = function() {
		if(arguments.length == 0)
			return this.parentNode;
		else if(typeof arguments[0] === "string"){
			let parent = this.parentNode;
			while(!parent.is(arguments[0]))
				parent = parent.parent(arguments[0]);
			return parent;
		}
	};
	
	Prototype.parents = function() {
		let result = new Array();
		let parent = Prototype.parent.apply(this, arguments);
		while(parent){
			result.push(parent);
			parent = Prototype.parent.apply(parent, arguments);
		}
		
		return NodeList.from(result);
	};	

	Prototype.selector = function(){
		if(typeof this.id === "undefined" || this.id.length == 0){
			let parent = this.parent();
			if(parent instanceof Document || parent instanceof  DocumentFragment)
				parent = undefined;
			let selector = this.localName.toLowerCase();
			if(typeof parent !== "undefined"){
				let sameTagSiblings = parent.find(":scope>" + selector);			
				if (sameTagSiblings instanceof NodeList) {
					let index = sameTagSiblings.indexOf(this) + 1;
					if (index > 0)
						selector += ':nth-child(' + index + ')';
				}		
			}
			return typeof parent !== "undefined" ? parent.selector() + ">" + selector : selector;
		}
		else
			return "#" + this.id;
	};	

	Prototype.closests = function(aQuery) {
		if(this.is(aQuery))
			return this;
		else{
			let result = this.find(aQuery, true);
			if(result.length > 0)
				return result;
			
			let parent = this.parent();
			if(typeof parent !== "undefined" && parent != document)
				return parent.closest(aQuery);
		}		
	};
	
	Prototype.closest = function(aQuery){
		let result = this.closests(aQuery);
		if(typeof result !== "undefined")
			return result[0];
	};
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/ReadyEventSupport.js":
/*!********************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/ReadyEventSupport.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {

	Prototype.ready = function(aFunction, once){	
		this.on("ready", aFunction, once);
		if(document.readyState == "complete")			
			this.trigger("ready");
		
		return this;
	};
	
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/ShowHideSupport.js":
/*!******************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/ShowHideSupport.js ***!
  \******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const support = function(Prototype) {

	Prototype.show = function(){
		if(this.__ishide){
			this.style.display = this.__display || "";
			this.__ishide = false;
		}
		return this;
	};
	
	Prototype.hide = function(){
		if(!this.__ishide){
			this.__display = this.style.display;
			this.style.display = "none";
			this.__ishide = true;
		}	
		
		return this;
	};
	
	Prototype.toggleShow = function(){
		if(this.__ishide)
			return this.show();
		else
			return this.hide();
	};
	
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/dom/extentions/ValueSupport.js":
/*!***************************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/dom/extentions/ValueSupport.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../polyfill/Array */ "./node_modules/dom-api-extension/src/polyfill/Array.js");
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_Array__WEBPACK_IMPORTED_MODULE_0__);

const support = function(Prototype) {
	const InputTypes =[
		{
			selector : "select",
			get : function(){
				let result = [];
				this.find("option:checked", true).forEach((function(result, option){
					result.push(option.value);
				}).bind(this, result));
				
				if(typeof arguments[0] === "boolean" && arguments[0])
					return result;				
				else if(result.length == 1)
					return result[0];
				else if(result.length > 1)
					return result;				
			},
			set : function(){				
				let values = [];
				if(arguments.length == 1 && typeof arguments[0] !== "undefined")
					values = values.concat(arguments[0]);
				else if(arguments.length > 1)
					values = values.concat(Array.from(arguments));
				
				this.find("option", true).forEach((function(values, option){
					let check = values.indexOf(option.value) > -1;
					if(check)
						option.selected = true;
					else
						option.selected = false;
				}).bind(this, values));
				
				this.trigger("changed");
			}			
		},
		{
			selector : "option",
			get : function(){
				if(this.selected)
					return this.value;
			},
			set : function(aValue){
				if(typeof aValue === "boolean")
					this.selected = aValue;
				else if(typeof aValue === "string")
					this.value = aValue;
				
				this.trigger("changed");				
			}			
		},
		{
			selector : "input[type=\"checkbox\"], input[type=\"radio\"]",
			get : function(){
				if(typeof this.value === "undefined" || this.value == "on")
					return this.checked;
				else if(this.checked)
					return this.value;				
			},
			set : function(aValue){
				if(typeof aValue === "boolean")
					this.checked = aValue;
				else if(typeof aValue === "string")
					this.value = aValue;
				
				this.trigger("changed");
			}
		}
	];
	
	const DefaultInputType = {
			get : function(){
				return this.value;
			},
			set : function(aValue){
				this.value = aValue;
				this.trigger("input");
			}	
	};
	
	const getInputType = function(aElement){
		for(let i = 0; i < InputTypes.length; i++)
			if(aElement.is(InputTypes[i].selector))
				return InputTypes[i];		
		return DefaultInputType;
	};
	
	
	Prototype.val = function() {
		let type = getInputType(this);
		if(arguments.length == 0){
			return type.get.apply(this, arguments);
		}
		else{
			type.set.apply(this, arguments);
			
			return this;
		}		
	};
	
};
/* harmony default export */ __webpack_exports__["a"] = (support);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/dom-api-extension/src/index.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _dom_Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/Node.js */ "./node_modules/dom-api-extension/src/dom/Node.js");
/* harmony import */ var _dom_Document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Document */ "./node_modules/dom-api-extension/src/dom/Document.js");
/* harmony import */ var _dom_HTMLElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/HTMLElement */ "./node_modules/dom-api-extension/src/dom/HTMLElement.js");
/* harmony import */ var _dom_HTMLInputElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/HTMLInputElement */ "./node_modules/dom-api-extension/src/dom/HTMLInputElement.js");
/* harmony import */ var _dom_HTMLSelectElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/HTMLSelectElement */ "./node_modules/dom-api-extension/src/dom/HTMLSelectElement.js");
/* harmony import */ var _dom_NodeList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom/NodeList */ "./node_modules/dom-api-extension/src/dom/NodeList.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Global */ "./node_modules/dom-api-extension/src/Global.js");
/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Global__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _JQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./JQuery */ "./node_modules/dom-api-extension/src/JQuery.js");











/***/ }),

/***/ "./node_modules/dom-api-extension/src/polyfill/Array.js":
/*!**************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/polyfill/Array.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (!Array.from) {
	Array.from = function() {
		let result = [];
		if (arguments.length > 0) {
			for (let i = 0; i < arguments.length; i++) {
				let arg = arguments[i];
				if (typeof arg.length === "number") {
					for (let j = 0; j < arg.length; j++)
						if (typeof arg[j] !== "undefined")
							result.push(arg[j]);
				} else {
					Object.getOwnPropertyNames(arguments[0]).forEach(
							(function(aResult, aName) {
								try {
									parseInt(aName);
									if (typeof this[aName] !== "undefined")
										result.push(this[aName]);
								} catch (e) {
								}
							}).bind(arguments[0], result));
				}
			}
		}
		return result;
	};
};

/***/ }),

/***/ "./node_modules/dom-api-extension/src/polyfill/CustomEvent.js":
/*!********************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/polyfill/CustomEvent.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof window.CustomEvent !== "function") {
	function CustomEvent(event, params) {
		params = params || {
		    bubbles : false,
		    cancelable : false,
		    detail : null
		};
		let evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
}


/***/ }),

/***/ "./node_modules/dom-api-extension/src/utils/DelegaterBuilder.js":
/*!**********************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/utils/DelegaterBuilder.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DelegaterBuilder = function() {
	let args = Array.from(arguments);
	let callback = args.shift();
	let source = args.shift();
	args.forEach((function(aSource, aCallback, aTarget){
		Object.getOwnPropertyNames(aTarget).forEach(
				(function(aSource, aTarget,aCallback,  aName) {
					let prop = Object.getOwnPropertyDescriptor(aTarget, aName);
					if (typeof aSource[aName] === "undefined" && typeof prop.value === "function")
						aSource[aName] = function(){return aCallback.call(this, aName, arguments);};										
				}).bind(null, aSource, aTarget, aCallback));
	}).bind(null, source, callback));
	
};
/* harmony default export */ __webpack_exports__["a"] = (DelegaterBuilder);

/***/ }),

/***/ "./node_modules/dom-api-extension/src/utils/ExtendPrototype.js":
/*!*********************************************************************!*\
  !*** ./node_modules/dom-api-extension/src/utils/ExtendPrototype.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../polyfill/Array */ "./node_modules/dom-api-extension/src/polyfill/Array.js");
/* harmony import */ var _polyfill_Array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_Array__WEBPACK_IMPORTED_MODULE_0__);


const extendPrototype = function(){
	let args = 	Array.from(arguments);
	let prototype = args.shift(); 
	while(args.length > 0){
		let extender = args.shift();
		extender(prototype);
	}
};

/* harmony default export */ __webpack_exports__["a"] = (extendPrototype);

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_dom_api_extension_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/dom-api-extension/src/index */ "./node_modules/dom-api-extension/src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9HbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9KUXVlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vSFRNTElucHV0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL2RvbS9IVE1MU2VsZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL2RvbS9Ob2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20tYXBpLWV4dGVuc2lvbi9zcmMvZG9tL05vZGVMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20tYXBpLWV4dGVuc2lvbi9zcmMvZG9tL2V4dGVudGlvbnMvQmFzaWNRdWVyeVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vZXh0ZW50aW9ucy9EYXRhU3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL2RvbS9leHRlbnRpb25zL0V2ZW50U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL2RvbS9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vZXh0ZW50aW9ucy9MaXN0U3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL2RvbS9leHRlbnRpb25zL01hbmlwdWxhdGlvblN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vZXh0ZW50aW9ucy9Ob2RlUXVlcnlTdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20tYXBpLWV4dGVuc2lvbi9zcmMvZG9tL2V4dGVudGlvbnMvUmVhZHlFdmVudFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vZXh0ZW50aW9ucy9TaG93SGlkZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9kb20vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tLWFwaS1leHRlbnNpb24vc3JjL3BvbHlmaWxsL0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20tYXBpLWV4dGVuc2lvbi9zcmMvcG9seWZpbGwvQ3VzdG9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb20tYXBpLWV4dGVuc2lvbi9zcmMvdXRpbHMvRXh0ZW5kUHJvdG90eXBlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVp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Ozs7O0FDcEdDO0FBQ0M7QUFDRztBQUNLO0FBQ0M7QUFDVDtBQUNOO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdEO0FBQ2xDLEtBQUs7QUFDTCxFQUFFOztBQUVGO0FBQ2UseUVBQWdCLEU7Ozs7Ozs7Ozs7Ozs7QUNkL0I7QUFBQTtBQUEyQjs7QUFFM0I7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx3RUFBZSxFOzs7Ozs7Ozs7Ozs7QUNYOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBIiwiZmlsZSI6ImRldi5idW5kbGUtMS4wLjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIihmdW5jdGlvbihHbG9iYWwpIHtcclxuXHRjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcblxyXG5cdEdsb2JhbC5maW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuZmluZC5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuXHRHbG9iYWwucmVhZHkgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5yZWFkeS5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuXHRHbG9iYWwuY3JlYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gXCJzdHJpbmdcIilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmchXCIpO1xyXG5cclxuXHRcdGxldCBib2R5ID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhcmd1bWVudHNbMF0udHJpbSgpLFxyXG5cdFx0XHRcdGFyZ3VtZW50c1sxXSB8fCBcInRleHQvaHRtbFwiKS5maW5kKFwiYm9keVwiKTtcclxuXHRcdGxldCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0bGV0IG5vZGVzID0gYm9keS5jaGlsZE5vZGVzO1xyXG5cdFx0d2hpbGUgKG5vZGVzLmxlbmd0aCAhPSAwKVxyXG5cdFx0XHRmcmFnLmFwcGVuZChub2Rlc1swXSk7XHJcblxyXG5cdFx0cmV0dXJuIGZyYWcuY2hpbGROb2RlcztcclxuXHR9O1xyXG59KSh3aW5kb3cgfHwgZ2xvYmFsKTsiLCJpbXBvcnQgXCIuL0dsb2JhbFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MRWxlbWVudFwiO1xyXG4oZnVuY3Rpb24oR2xvYmFsKSB7XHJcblx0LyoqXHJcblx0ICogSlF1ZXJ5IHByZXZlbnQganF1ZXJ5XHJcblx0ICovXHJcblx0Y29uc3QgJCA9IEdsb2JhbC4kID0gR2xvYmFsLkpRdWVyeSA9IEdsb2JhbC5qUXVlcnkgPSBHbG9iYWwuJCB8fCBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVybiBkb2N1bWVudDtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1x0XHRcdFxyXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHJldHVybiBHbG9iYWwucmVhZHkuYXBwbHkoR2xvYmFsLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0aWYgKC88W148XSs+L2cudGVzdChhcmd1bWVudHNbMF0pKVxyXG5cdFx0XHRcdFx0cmV0dXJuIEdsb2JhbC5jcmVhdGUuYXBwbHkoR2xvYmFsLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBHbG9iYWwuZmluZC5hcHBseShHbG9iYWwsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzWzBdO1xyXG5cdFx0fVxyXG5cdH07XHJcbn0pKHdpbmRvdyB8fCBnbG9iYWwpOyIsImltcG9ydCBleHRlbmRQcm90b3R5cGUgZnJvbSBcIi4uL3V0aWxzL0V4dGVuZFByb3RvdHlwZVwiO1xyXG5pbXBvcnQgQmFzaWNRdWVyeVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9CYXNpY1F1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgRXZlbnRTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRXZlbnRTdXBwb3J0XCI7XHJcbmltcG9ydCBSZWFkeUV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1JlYWR5RXZlbnRTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoRG9jdW1lbnQucHJvdG90eXBlLCBCYXNpY1F1ZXJ5U3VwcG9ydCwgRXZlbnRTdXBwb3J0LCBSZWFkeUV2ZW50U3VwcG9ydCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xyXG5cdGRvY3VtZW50LnRyaWdnZXIoXCJyZWFkeVwiKTtcclxufSk7XHJcblxyXG5cclxuIiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBCYXNpY1F1ZXJ5U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0Jhc2ljUXVlcnlTdXBwb3J0XCI7XHJcbmltcG9ydCBOb2RlUXVlcnlTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvTm9kZVF1ZXJ5U3VwcG9ydFwiO1xyXG5pbXBvcnQgSHRtbENsYXNzU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0h0bWxDbGFzc1N1cHBvcnRcIjtcclxuaW1wb3J0IEV2ZW50U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0V2ZW50U3VwcG9ydFwiO1xyXG5pbXBvcnQgU2hvd0hpZGVTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvU2hvd0hpZGVTdXBwb3J0XCI7XHJcblxyXG5cclxuZXh0ZW5kUHJvdG90eXBlKEhUTUxFbGVtZW50LnByb3RvdHlwZSxCYXNpY1F1ZXJ5U3VwcG9ydCxOb2RlUXVlcnlTdXBwb3J0LEh0bWxDbGFzc1N1cHBvcnQsRXZlbnRTdXBwb3J0LFNob3dIaWRlU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBWYWx1ZVN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9WYWx1ZVN1cHBvcnRcIjtcclxuXHJcblxyXG5leHRlbmRQcm90b3R5cGUoSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IFZhbHVlU3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL1ZhbHVlU3VwcG9ydFwiO1xyXG5cclxuXHJcbmV4dGVuZFByb3RvdHlwZShIVE1MU2VsZWN0RWxlbWVudC5wcm90b3R5cGUsVmFsdWVTdXBwb3J0KTsiLCJpbXBvcnQgZXh0ZW5kUHJvdG90eXBlIGZyb20gXCIuLi91dGlscy9FeHRlbmRQcm90b3R5cGVcIjtcclxuaW1wb3J0IERhdGFTdXBwb3J0IGZyb20gXCIuL2V4dGVudGlvbnMvRGF0YVN1cHBvcnRcIjtcclxuaW1wb3J0IE1hbmlwdWxhdGlvblN1cHBvcnQgZnJvbSBcIi4vZXh0ZW50aW9ucy9NYW5pcHVsYXRpb25TdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZS5wcm90b3R5cGUsRGF0YVN1cHBvcnQsTWFuaXB1bGF0aW9uU3VwcG9ydCk7IiwiaW1wb3J0IGV4dGVuZFByb3RvdHlwZSBmcm9tIFwiLi4vdXRpbHMvRXh0ZW5kUHJvdG90eXBlXCI7XHJcbmltcG9ydCBEZWxlZ2F0ZXJCdWlsZGVyIGZyb20gXCIuLi91dGlscy9EZWxlZ2F0ZXJCdWlsZGVyXCI7XHJcbmltcG9ydCBMaXN0U3VwcG9ydCBmcm9tIFwiLi9leHRlbnRpb25zL0xpc3RTdXBwb3J0XCI7XHJcblxyXG5leHRlbmRQcm90b3R5cGUoTm9kZUxpc3QucHJvdG90eXBlLCBMaXN0U3VwcG9ydCk7XHJcblxyXG5EZWxlZ2F0ZXJCdWlsZGVyKGZ1bmN0aW9uKGFGdW5jdGlvbk5hbWUsIHRoZUFyZ3VtZW50cyl7XHJcblx0bGV0IG5vZGVzID0gdGhpcy52YWx1ZXMoKTtcclxuXHRsZXQgbm9kZSA9IG5vZGVzLm5leHQoKTtcclxuXHRsZXQgcmVzdWx0cyA9IFtdO1xyXG5cdHdoaWxlKG5vZGUgJiYgbm9kZS52YWx1ZSl7XHJcblx0XHRub2RlID0gbm9kZS52YWx1ZTtcclxuXHRcdGlmKHR5cGVvZiBub2RlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBub2RlW2FGdW5jdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gbm9kZVthRnVuY3Rpb25OYW1lXS5hcHBseShub2RlLCB0aGVBcmd1bWVudHMpO1xyXG5cdFx0XHRpZih0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdCAhPSBudWxsKXtcclxuXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSlcclxuXHRcdFx0XHRcdHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChyZXN1bHQpO1xyXG5cdFx0XHRcdGVsc2UgaWYocmVzdWx0IGluc3RhbmNlb2YgTm9kZUxpc3QpXHJcblx0XHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoQXJyYXkuZnJvbShyZXN1bHQpKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2gocmVzdWx0KVxyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fVxyXG5cdFx0bm9kZSA9IG5vZGVzLm5leHQoKTtcdFx0XHJcblx0fVxyXG5cdFxyXG5cdGlmKHJlc3VsdHMubGVuZ3RoID09IDApXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdGVsc2UgaWYocmVzdWx0c1swXSBpbnN0YW5jZW9mIE5vZGUpXHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShyZXN1bHRzKTtcclxuXHRlbHNlXHJcblx0XHRyZXR1cm4gcmVzdWx0cztcdFxyXG59LE5vZGVMaXN0LnByb3RvdHlwZSwgTm9kZS5wcm90b3R5cGUsIEhUTUxFbGVtZW50LnByb3RvdHlwZSwgSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGUsIEVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcblxyXG5Ob2RlTGlzdC5mcm9tID0gZnVuY3Rpb24oKXtcclxuXHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAgYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgTm9kZUxpc3Qpe1xyXG5cdFx0cmV0dXJuIGFyZ3VtZW50c1swXTtcdFx0XHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBpbnRlcm5hbCA9IHtcclxuXHRcdFx0bGVuZ3RoOiB7dmFsdWU6IDB9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRsZXQgbGlzdCA9IEFycmF5LmZyb20oYXJncy5zaGlmdCgpKTtcdFx0XHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgbGlzdFtpXSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsaXN0W2ldIGluc3RhbmNlb2YgTm9kZSl7XHJcblx0XHRcdFx0XHRpbnRlcm5hbFtpXSA9IHt2YWx1ZTogbGlzdFtpXSwgZW51bWVyYWJsZTogdHJ1ZX07XHJcblx0XHRcdFx0XHRpbnRlcm5hbC5sZW5ndGgudmFsdWUrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBPYmplY3QuY3JlYXRlKE5vZGVMaXN0LnByb3RvdHlwZSxpbnRlcm5hbCApO1xyXG5cdH1cclxufSIsImNvbnN0IHN1cHBvcnQgPSBmdW5jdGlvbihQcm90b3R5cGUpIHtcclxuXHRjb25zdCBwYXJlbnRTZWxlY3RvciA9IC86cGFyZW50KFxcKFxcXCIoW15cXCldKilcXFwiXFwpKT8vaTtcclxuXHRcclxuXHRQcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKGFTZWxlY3Rvcikge1xyXG5cdFx0bGV0IG1hdGNoID0gcGFyZW50U2VsZWN0b3IuZXhlYyhhU2VsZWN0b3IpO1xyXG5cdFx0aWYobWF0Y2gpe1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gdGhpcztcclxuXHRcdFx0aWYobWF0Y2guaW5kZXggPiAwKXtcclxuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoYVNlbGVjdG9yLnN1YnN0cigwLCBtYXRjaC5pbmRleCkpO1xyXG5cdFx0XHRcdGlmKHJlc3VsdC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YgbWF0Y2hbMl0gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LnBhcmVudChtYXRjaFsyXSk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQucGFyZW50KCk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBuZXh0U2VsZWN0b3IgPSBhU2VsZWN0b3Iuc3Vic3RyKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKS50cmltKCk7XHJcblx0XHRcdGlmKG5leHRTZWxlY3Rvci50cmltKCkubGVuZ3RoID4gMClcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LmZpbmQobmV4dFNlbGVjdG9yKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKGFTZWxlY3Rvcik7XHJcblx0fTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuXHJcbiIsImNvbnN0IHN1cHBvcnQgPSBmdW5jdGlvbihQcm90b3R5cGUpIHtcclxuXHRQcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9fZGF0YSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHR0aGlzLl9fZGF0YSA9IHt9O1xyXG5cdFx0XHRpZih0eXBlb2YgdGhpcy5kYXRhc2V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdGZvciAobmFtZSBpbiB0aGlzLmRhdGFzZXQpXHJcblx0XHRcdFx0XHR0aGlzLl9fZGF0YVtuYW1lXSA9IHRoaXMuZGF0YXNldFtuYW1lXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fX2RhdGE7XHJcblx0XHRlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdHJldHVybiB0aGlzLl9fZGF0YVthcmd1bWVudHNbMF1dIDtcclxuXHRcdGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwidW5kZWZpbmVkXCIgfHwgYXJndW1lbnRzWzFdID09IG51bGwpXHJcblx0XHRcdGRlbGV0ZSB0aGlzLl9fZGF0YVthcmd1bWVudHNbMF1dO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLl9fZGF0YVthcmd1bWVudHNbMF1dID0gYXJndW1lbnRzWzFdO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBcIi4uLy4uL3BvbHlmaWxsL0N1c3RvbUV2ZW50XCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gZnVuY3Rpb24oUHJvdG90eXBlKSB7XHJcblx0Y29uc3QgV3JhcHBlZEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGFDb25maWcsIGFDYWxsYmFjayAsYUV2ZW50KXtcclxuXHRcdGlmKHR5cGVvZiBhQ29uZmlnLmZpbHRlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhYUV2ZW50LnRhcmdldC5pcyhhQ29uZmlnLmZpbHRlcikpXHRcdFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRcclxuXHRcdGxldCBhcmdzID0gW2FFdmVudF07XHJcblx0XHRpZih0eXBlb2YgYUNvbmZpZy5kYXRhICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRhcmdzID0gYXJncy5jb25jYXQoYUNvbmZpZy5kYXRhKTtcclxuXHRcdFxyXG5cdFx0bGV0IHJlc3VsdCA9IGFDYWxsYmFjay5hcHBseShhQ2FsbGJhY2ssIGFyZ3MpO1xyXG5cdFx0aWYoYUNvbmZpZy5zaW5nbGVDYWxsKVxyXG5cdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYUNhbGxiYWNrKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcdFx0XHJcblx0fTtcclxuXHRcclxuXHRcclxuXHRjb25zdCBhZGRFdmVudExpc3RlbmVyID0gUHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XHJcblx0UHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMilcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVG9vIGxlc3MgYXJndW1lbnRzIVwiKTtcclxuXHJcblx0XHR0aGlzLm9uKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuXHR9O1x0XHJcblx0XHJcblx0UHJvdG90eXBlLm9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRvbyBsZXNzIGFyZ3VtZW50cyFcIik7XHJcblx0XHRcclxuXHRcdGlmICh0eXBlb2YgdGhpcy5fX2NhbGxiYWNrTWFwID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHR0aGlzLl9fY2FsbGJhY2tNYXAgPSB7fTtcclxuXHJcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRcdGxldCBldmVudHMgPSBhcmdzLnNoaWZ0KCkuc3BsaXQoLyhcXHMrKXwoXFxzKixcXHMqKS8pO1xyXG5cdFx0bGV0IGhhbmRsZXJDb25maWcgPSB7XHJcblx0XHRcdGZpbHRlciA6ICh0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiA/IGFyZ3Muc2hpZnQoKS5zcGxpdCgvXFxzKixcXHMqLykgOiB1bmRlZmluZWQpLFxyXG5cdFx0XHRkYXRhIDogKHR5cGVvZiBhcmdzWzBdICE9PSBcImZ1bmN0aW9uXCIgPyBhcmdzLnNoaWZ0KCkgOiB1bmRlZmluZWQpXHJcblx0XHR9O1xyXG5cdCAgICBsZXQgY2FsbGJhY2sgPSBhcmdzLnNoaWZ0KCk7XHJcblx0ICAgIFxyXG5cdCAgICBoYW5kbGVyQ29uZmlnLnNpbmdsZUNhbGwgPSAodHlwZW9mIGFyZ3NbMF0gIT09IFwiYm9vbGVhblwiID8gYXJncy5zaGlmdCgpIDogZmFsc2UpO1xyXG5cclxuXHRcdGxldCBldmVudE1hcCA9IHt9O1xyXG5cdFx0ZXZlbnRzLmZvckVhY2goKGZ1bmN0aW9uKHJlc3VsdCwgY29uZmlnLCBjYWxsYmFjaywgZXZlbnQpe1xyXG5cdFx0XHRsZXQgd3JhcHBlZEV2ZW50SGFuZGxlciA9IFdyYXBwZWRFdmVudEhhbmRsZXIuYmluZCh0aGlzLCBjb25maWcsIGNhbGxiYWNrKTtcclxuXHRcdFx0cmVzdWx0W2V2ZW50XSA9IHdyYXBwZWRFdmVudEhhbmRsZXI7XHRcdFx0XHJcblx0XHRcdGFkZEV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgd3JhcHBlZEV2ZW50SGFuZGxlciwgdHJ1ZSk7XHJcblx0XHRcdFxyXG5cdFx0fSkuYmluZCh0aGlzLCBldmVudE1hcCwgaGFuZGxlckNvbmZpZywgY2FsbGJhY2spKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5fX2NhbGxiYWNrTWFwW2NhbGxiYWNrXSA9IGV2ZW50TWFwO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1x0XHJcblx0XHJcblx0Y29uc3QgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IFByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xyXG5cdFByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gUHJvdG90eXBlLnJlbW92ZU9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAxIHx8IHR5cGVvZiB0aGlzLl9fY2FsbGJhY2tNYXAgPT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdHJldHVybiByZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFxyXG5cdFx0bGV0IGV2ZW50cyA9IHVuZGVmaW5lZDtcclxuXHRcdGxldCBjYWxsYmFjayA9IHVuZGVmaW5lZDtcclxuXHRcdGlmKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdGV2ZW50cyA9IGFyZ3VtZW50c1swXS5zcGxpdCgvKFxccyspfChcXHMqLFxccyopLyk7XHJcblx0XHRlbHNlIGlmKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0Y2FsbGJhY2sgPSBhcmd1bWVudHNbMF0uc2hpZnQoKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiV3JvbmcgYXJndW1lbnQhIC0+IGNhbGwgZnVuY3Rpb24oW2V2ZW50fGhhbmRsZXJdKVwiKTtcclxuXHRcdFxyXG5cdFx0bGV0IHJlbW92YWxIYW5kbGVyID0gW107XHJcblx0XHRpZih0eXBlb2YgZXZlbnRzID09PSBcInVuZGVmaW5lZFwiKXtcclxuXHRcdFx0ZXZlbnRNYXAgPSB0aGlzLl9fY2FsbGJhY2tNYXBbY2FsbGJhY2tdO1xyXG5cdFx0XHRpZih0eXBlb2YgZXZlbnRNYXAgIT09IFwidW5kZWZpbmVkXCIpe1xyXG5cdFx0XHRcdGV2ZW50TWFwLmdldE93blByb3BlcnR5TmFtZXMoKS5mb3JFYWNoKChmdW5jdGlvbihyZXN1bHQsIGV2ZW50TWFwLCBldmVudCl7XHJcblx0XHRcdFx0XHRsZXQgaGFuZGxlciA9IGV2ZW50TWFwW2V2ZW50XTtcclxuXHRcdFx0XHRcdGlmKHR5cGVvZiBoYW5kbGVyICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChoYW5kbGVyKTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fSkuYmluZCh0aGlzLCByZW1vdmFsSGFuZGxlciwgZXZlbnRNYXApKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5fX2NhbGxiYWNrTWFwW2NhbGxiYWNrXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGV2ZW50cy5mb3JFYWNoKChmdW5jdGlvbihyZXN1bHQsIGV2ZW50KXtcclxuXHRcdFx0XHRPYmplY3QuZ2V0UHJvcGVydHlOYW1lcyh0aGlzLl9fY2FsbGJhY2tNYXApLmZvckVhY2goKGZ1bmN0aW9uKGFFdmVudCwgQ2FsbGJhY2spe1xyXG5cdFx0XHRcdFx0bGV0IGV2ZW50TWFwID0gdGhpcy5fX2NhbGxiYWNrTWFwW0NhbGxiYWNrXTtcclxuXHRcdFx0XHRcdGRlbGV0ZSBldmVudE1hcFthRXZlbnRdO1xyXG5cdFx0XHRcdFx0aWYoZXZlbnRNYXAuZ2V0T3duUHJvcGVydHlOYW1lcygpID09IDApXHJcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9fY2FsbGJhY2tNYXBbQ2FsbGJhY2tdO1xyXG5cdFx0XHRcdH0pLmJpbmQodGhpcywgZXZlbnQpKTtcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdH0pLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRcclxuXHRQcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgZXZlbnQgPSB1bmRlZmluZWQ7XHJcblx0XHRpZih0eXBlb2YgdGhpc1tcIm9uXCIgKyBhcmd1bWVudHNbMF1dID09PSBcImZ1bmN0aW9uXCIpe1xyXG5cdFx0XHRldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XHJcblx0XHRcdGV2ZW50LmluaXRFdmVudChhcmd1bWVudHNbMF0sIHRydWUsIHRydWUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChhcmd1bWVudHNbMF0sICB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogYXJndW1lbnRzWzFdIH0pO1xyXG5cdFx0XHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDtcclxuIiwiY29uc3Qgc3VwcG9ydCA9IGZ1bmN0aW9uKFByb3RvdHlwZSkge1x0XHJcblx0XHJcblx0UHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goKGZ1bmN0aW9uKGNsYXp6KXtcclxuXHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoY2xhenopO1xyXG5cdFx0XHR9KS5iaW5kKHRoaXMpKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLChmdW5jdGlvbihjbGF6eil7XHJcblx0XHRcdFx0dGhpcy5hZGRDbGFzcyhjbGF6eik7XHJcblx0XHRcdH0pLmJpbmQodGhpcykpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRhcmd1bWVudHNbMF0uc3BsaXQoL1xccysvKS5mb3JFYWNoKChmdW5jdGlvbihjbGF6eil7XHJcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXp6KTtcclxuXHRcdFx0fSkuYmluZCh0aGlzKSk7XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFyZ3VtZW50cywoZnVuY3Rpb24oY2xhenope1xyXG5cdFx0XHRcdHRoaXMucmVtb3ZlQ2xhc3MoY2xhenopO1xyXG5cdFx0XHR9KS5iaW5kKHRoaXMpKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHRcdFxyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDEpXHJcblx0XHRcdGFyZ3VtZW50c1swXS5zcGxpdCgvXFxzKy8pLmZvckVhY2goKGZ1bmN0aW9uKGNsYXp6KXtcclxuXHRcdFx0XHR0aGlzLmNsYXNzTGlzdC50b2dnbGUoY2xhenopO1xyXG5cdFx0XHR9KS5iaW5kKHRoaXMpKTtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLChmdW5jdGlvbihjbGF6eil7XHJcblx0XHRcdFx0dGhpcy50b29nbGVDbGFzcyhjbGF6eik7XHJcblx0XHRcdH0pLmJpbmQodGhpcykpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImNvbnN0IHN1cHBvcnQgPSBmdW5jdGlvbihQcm90b3R5cGUpIHtcdFx0XHJcblx0UHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbigpIHtcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRpZih0aGlzW2ldID09IGFyZ3VtZW50c1swXSlcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblx0XHJcblx0aWYodHlwZW9mIFByb3RvdHlwZS5mb3JFYWNoID09PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0UHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmZvckVhY2guYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbMF07XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMubGVuZ3RoID4gMClcclxuXHRcdFx0cmV0dXJuIHRoaXNbdGhpcy5sZW5ndGggLSAxXTtcclxuXHR9O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0OyIsImltcG9ydCBcIi4uLy4uL3BvbHlmaWxsL0FycmF5XCI7XHJcblxyXG5jb25zdCBzdXBwb3J0ID0gZnVuY3Rpb24oUHJvdG90eXBlKSB7XHJcblxyXG5cdFByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGVzKCkgPyAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bGV0IHJlc3VsdCA9IHt9O1xyXG5cdFx0XHRcdHRoaXMuZ2V0QXR0cmlidXRlTmFtZXMoKS5mb3JFYWNoKChmdW5jdGlvbihyZXN1bHQsIG5hbWUpIHtcclxuXHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG5cdFx0XHRcdH0pLmJpbmQodGhpcywgcmVzdWx0KSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0fSkuY2FsbCh0aGlzKSA6IHVuZGVmaW5lZDtcclxuXHRcdGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGFyZ3VtZW50c1swXSk7XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInVuZGVmaW5lZFwiIHx8IGFyZ3VtZW50c1sxXSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShhcmd1bWVudHNbMF0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblx0XHJcblx0UHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKXtcclxuXHRcdGxldCBub2RlcyA9IHRoaXMuY2hpbGROb2Rlc1xyXG5cdFx0d2hpbGUobm9kZXMubGVuZ3RoICE9IDApXHRcdFx0XHJcblx0XHRcdG5vZGVzWzBdLnJlbW92ZSh0cnVlKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jaGlsZE5vZGVzO1xyXG5cdH07XHRcclxuXHRcclxuXHRQcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcclxuXHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwiYm9vbGVhblwiKVxyXG5cdFx0XHRpZihhcmd1bWVudHNbMF0pXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMub3V0ZXJIVE1MO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xyXG5cdFx0ZWxzZSBcclxuXHRcdFx0QXJyYXkuZnJvbShhcmd1bWVudHMpLmZvckVhY2goKGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdFx0XHRcdGVsc2UgaWYoY29udGVudCBpbnN0YW5jZW9mIEVsZW1lbnQpe1xyXG5cdFx0XHRcdFx0dGhpcy5lbXB0eSgpO1xyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5iaW5kKHRoaXMpKTtcdFx0XHJcblx0XHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJpbXBvcnQgXCIuLi8uLi9wb2x5ZmlsbC9BcnJheVwiO1xyXG5cclxuY29uc3Qgc3VwcG9ydCA9IGZ1bmN0aW9uKFByb3RvdHlwZSkge1xyXG5cdFxyXG5cdFByb3RvdHlwZS5pcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA9PSAxKXtcclxuXHRcdFx0aWYodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXRjaGVzKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdGVsc2UgaWYodHlwZW9mIGFyZ3VtZW50c1swXS5sZW5ndGggPT09IFwibnVtYmVyXCIpe1xyXG5cdFx0XHRcdGxldCBmaWx0ZXIgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGZpbHRlci5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdGlmKHRoaXMubWF0Y2hlcyhmaWx0ZXJbaV0pKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVx0XHRcdFx0XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5pcyhBcnJheS5mcm9tKGFyZ3VtZW50cykpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcdFxyXG5cdFxyXG5cdFByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Tm9kZTtcclxuXHRcdGVsc2UgaWYodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIil7XHJcblx0XHRcdGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcblx0XHRcdHdoaWxlKCFwYXJlbnQuaXMoYXJndW1lbnRzWzBdKSlcclxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50KGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fTtcclxuXHRcclxuXHRQcm90b3R5cGUucGFyZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0bGV0IHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdHdoaWxlKHBhcmVudCl7XHJcblx0XHRcdHJlc3VsdC5wdXNoKHBhcmVudCk7XHJcblx0XHRcdHBhcmVudCA9IFByb3RvdHlwZS5wYXJlbnQuYXBwbHkocGFyZW50LCBhcmd1bWVudHMpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gTm9kZUxpc3QuZnJvbShyZXN1bHQpO1xyXG5cdH07XHRcclxuXHJcblx0UHJvdG90eXBlLnNlbGVjdG9yID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHR5cGVvZiB0aGlzLmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuaWQubGVuZ3RoID09IDApe1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQoKTtcclxuXHRcdFx0aWYocGFyZW50IGluc3RhbmNlb2YgRG9jdW1lbnQgfHwgcGFyZW50IGluc3RhbmNlb2YgIERvY3VtZW50RnJhZ21lbnQpXHJcblx0XHRcdFx0cGFyZW50ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRsZXQgc2VsZWN0b3IgPSB0aGlzLmxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRpZih0eXBlb2YgcGFyZW50ICE9PSBcInVuZGVmaW5lZFwiKXtcclxuXHRcdFx0XHRsZXQgc2FtZVRhZ1NpYmxpbmdzID0gcGFyZW50LmZpbmQoXCI6c2NvcGU+XCIgKyBzZWxlY3Rvcik7XHRcdFx0XHJcblx0XHRcdFx0aWYgKHNhbWVUYWdTaWJsaW5ncyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XHJcblx0XHRcdFx0XHRsZXQgaW5kZXggPSBzYW1lVGFnU2libGluZ3MuaW5kZXhPZih0aGlzKSArIDE7XHJcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAwKVxyXG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSAnOm50aC1jaGlsZCgnICsgaW5kZXggKyAnKSc7XHJcblx0XHRcdFx0fVx0XHRcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHBhcmVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcmVudC5zZWxlY3RvcigpICsgXCI+XCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gXCIjXCIgKyB0aGlzLmlkO1xyXG5cdH07XHRcclxuXHJcblx0UHJvdG90eXBlLmNsb3Nlc3RzID0gZnVuY3Rpb24oYVF1ZXJ5KSB7XHJcblx0XHRpZih0aGlzLmlzKGFRdWVyeSkpXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0ZWxzZXtcclxuXHRcdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZChhUXVlcnksIHRydWUpO1xyXG5cdFx0XHRpZihyZXN1bHQubGVuZ3RoID4gMClcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHBhcmVudCA9IHRoaXMucGFyZW50KCk7XHJcblx0XHRcdGlmKHR5cGVvZiBwYXJlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgcGFyZW50ICE9IGRvY3VtZW50KVxyXG5cdFx0XHRcdHJldHVybiBwYXJlbnQuY2xvc2VzdChhUXVlcnkpO1xyXG5cdFx0fVx0XHRcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24oYVF1ZXJ5KXtcclxuXHRcdGxldCByZXN1bHQgPSB0aGlzLmNsb3Nlc3RzKGFRdWVyeSk7XHJcblx0XHRpZih0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0WzBdO1xyXG5cdH07XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiY29uc3Qgc3VwcG9ydCA9IGZ1bmN0aW9uKFByb3RvdHlwZSkge1xyXG5cclxuXHRQcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbihhRnVuY3Rpb24sIG9uY2Upe1x0XHJcblx0XHR0aGlzLm9uKFwicmVhZHlcIiwgYUZ1bmN0aW9uLCBvbmNlKTtcclxuXHRcdGlmKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKVx0XHRcdFxyXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWFkeVwiKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJjb25zdCBzdXBwb3J0ID0gZnVuY3Rpb24oUHJvdG90eXBlKSB7XHJcblxyXG5cdFByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuX19pc2hpZGUpe1xyXG5cdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSB0aGlzLl9fZGlzcGxheSB8fCBcIlwiO1xyXG5cdFx0XHR0aGlzLl9faXNoaWRlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKCF0aGlzLl9faXNoaWRlKXtcclxuXHRcdFx0dGhpcy5fX2Rpc3BsYXkgPSB0aGlzLnN0eWxlLmRpc3BsYXk7XHJcblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHR0aGlzLl9faXNoaWRlID0gdHJ1ZTtcclxuXHRcdH1cdFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cdFxyXG5cdFByb3RvdHlwZS50b2dnbGVTaG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKHRoaXMuX19pc2hpZGUpXHJcblx0XHRcdHJldHVybiB0aGlzLnNob3coKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGlkZSgpO1xyXG5cdH07XHJcblx0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnQ7IiwiaW1wb3J0IFwiLi4vLi4vcG9seWZpbGwvQXJyYXlcIjtcclxuY29uc3Qgc3VwcG9ydCA9IGZ1bmN0aW9uKFByb3RvdHlwZSkge1xyXG5cdGNvbnN0IElucHV0VHlwZXMgPVtcclxuXHRcdHtcclxuXHRcdFx0c2VsZWN0b3IgOiBcInNlbGVjdFwiLFxyXG5cdFx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGxldCByZXN1bHQgPSBbXTtcclxuXHRcdFx0XHR0aGlzLmZpbmQoXCJvcHRpb246Y2hlY2tlZFwiLCB0cnVlKS5mb3JFYWNoKChmdW5jdGlvbihyZXN1bHQsIG9wdGlvbil7XHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xyXG5cdFx0XHRcdH0pLmJpbmQodGhpcywgcmVzdWx0KSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJib29sZWFuXCIgJiYgYXJndW1lbnRzWzBdKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcdFx0XHRcdFxyXG5cdFx0XHRcdGVsc2UgaWYocmVzdWx0Lmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdFswXTtcclxuXHRcdFx0XHRlbHNlIGlmKHJlc3VsdC5sZW5ndGggPiAxKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXQgOiBmdW5jdGlvbigpe1x0XHRcdFx0XHJcblx0XHRcdFx0bGV0IHZhbHVlcyA9IFtdO1xyXG5cdFx0XHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdFx0dmFsdWVzID0gdmFsdWVzLmNvbmNhdChhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRcdGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXHJcblx0XHRcdFx0XHR2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5maW5kKFwib3B0aW9uXCIsIHRydWUpLmZvckVhY2goKGZ1bmN0aW9uKHZhbHVlcywgb3B0aW9uKXtcclxuXHRcdFx0XHRcdGxldCBjaGVjayA9IHZhbHVlcy5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMTtcclxuXHRcdFx0XHRcdGlmKGNoZWNrKVxyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9KS5iaW5kKHRoaXMsIHZhbHVlcykpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihcImNoYW5nZWRcIik7XHJcblx0XHRcdH1cdFx0XHRcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHNlbGVjdG9yIDogXCJvcHRpb25cIixcclxuXHRcdFx0Z2V0IDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZih0aGlzLnNlbGVjdGVkKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdFx0aWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkID0gYVZhbHVlO1xyXG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdHRoaXMudmFsdWUgPSBhVmFsdWU7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcdFx0XHRcdFxyXG5cdFx0XHR9XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRzZWxlY3RvciA6IFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXVwiLFxyXG5cdFx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKHR5cGVvZiB0aGlzLnZhbHVlID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMudmFsdWUgPT0gXCJvblwiKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMuY2hlY2tlZClcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1x0XHRcdFx0XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCA6IGZ1bmN0aW9uKGFWYWx1ZSl7XHJcblx0XHRcdFx0aWYodHlwZW9mIGFWYWx1ZSA9PT0gXCJib29sZWFuXCIpXHJcblx0XHRcdFx0XHR0aGlzLmNoZWNrZWQgPSBhVmFsdWU7XHJcblx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgYVZhbHVlID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0dGhpcy52YWx1ZSA9IGFWYWx1ZTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XTtcclxuXHRcclxuXHRjb25zdCBEZWZhdWx0SW5wdXRUeXBlID0ge1xyXG5cdFx0XHRnZXQgOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXQgOiBmdW5jdGlvbihhVmFsdWUpe1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBhVmFsdWU7XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyKFwiaW5wdXRcIik7XHJcblx0XHRcdH1cdFxyXG5cdH07XHJcblx0XHJcblx0Y29uc3QgZ2V0SW5wdXRUeXBlID0gZnVuY3Rpb24oYUVsZW1lbnQpe1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IElucHV0VHlwZXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdGlmKGFFbGVtZW50LmlzKElucHV0VHlwZXNbaV0uc2VsZWN0b3IpKVxyXG5cdFx0XHRcdHJldHVybiBJbnB1dFR5cGVzW2ldO1x0XHRcclxuXHRcdHJldHVybiBEZWZhdWx0SW5wdXRUeXBlO1xyXG5cdH07XHJcblx0XHJcblx0XHJcblx0UHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHR5cGUgPSBnZXRJbnB1dFR5cGUodGhpcyk7XHJcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID09IDApe1xyXG5cdFx0XHRyZXR1cm4gdHlwZS5nZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHR5cGUuc2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cdFx0XHJcblx0fTtcclxuXHRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydDsiLCJcclxuaW1wb3J0IFwiLi9kb20vTm9kZS5qc1wiO1xyXG5pbXBvcnQgXCIuL2RvbS9Eb2N1bWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MRWxlbWVudFwiO1xyXG5pbXBvcnQgXCIuL2RvbS9IVE1MSW5wdXRFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL0hUTUxTZWxlY3RFbGVtZW50XCI7XHJcbmltcG9ydCBcIi4vZG9tL05vZGVMaXN0XCI7XHJcbmltcG9ydCBcIi4vR2xvYmFsXCI7XHJcbmltcG9ydCBcIi4vSlF1ZXJ5XCI7XHJcbiIsImlmICghQXJyYXkuZnJvbSkge1xyXG5cdEFycmF5LmZyb20gPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBbXTtcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBhcmcgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGFyZy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBhcmdbal0gIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goYXJnW2pdKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJndW1lbnRzWzBdKS5mb3JFYWNoKFxyXG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihhUmVzdWx0LCBhTmFtZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGFyc2VJbnQoYU5hbWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXNbYU5hbWVdICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXNbYU5hbWVdKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KS5iaW5kKGFyZ3VtZW50c1swXSwgcmVzdWx0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcbn07IiwiaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09IFwiZnVuY3Rpb25cIikge1xyXG5cdGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcclxuXHRcdHBhcmFtcyA9IHBhcmFtcyB8fCB7XHJcblx0XHQgICAgYnViYmxlcyA6IGZhbHNlLFxyXG5cdFx0ICAgIGNhbmNlbGFibGUgOiBmYWxzZSxcclxuXHRcdCAgICBkZXRhaWwgOiBudWxsXHJcblx0XHR9O1xyXG5cdFx0bGV0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG5cdFx0ZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuXHRcdHJldHVybiBldnQ7XHJcblx0fVxyXG5cdEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XHJcblx0d2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbn1cclxuIiwiY29uc3QgRGVsZWdhdGVyQnVpbGRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xyXG5cdGxldCBjYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcclxuXHRsZXQgc291cmNlID0gYXJncy5zaGlmdCgpO1xyXG5cdGFyZ3MuZm9yRWFjaCgoZnVuY3Rpb24oYVNvdXJjZSwgYUNhbGxiYWNrLCBhVGFyZ2V0KXtcclxuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFUYXJnZXQpLmZvckVhY2goXHJcblx0XHRcdFx0KGZ1bmN0aW9uKGFTb3VyY2UsIGFUYXJnZXQsYUNhbGxiYWNrLCAgYU5hbWUpIHtcclxuXHRcdFx0XHRcdGxldCBwcm9wID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhVGFyZ2V0LCBhTmFtZSk7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFTb3VyY2VbYU5hbWVdID09PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBwcm9wLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0XHRcdGFTb3VyY2VbYU5hbWVdID0gZnVuY3Rpb24oKXtyZXR1cm4gYUNhbGxiYWNrLmNhbGwodGhpcywgYU5hbWUsIGFyZ3VtZW50cyk7fTtcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pLmJpbmQobnVsbCwgYVNvdXJjZSwgYVRhcmdldCwgYUNhbGxiYWNrKSk7XHJcblx0fSkuYmluZChudWxsLCBzb3VyY2UsIGNhbGxiYWNrKSk7XHJcblx0XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IERlbGVnYXRlckJ1aWxkZXI7IiwiaW1wb3J0IFwiLi4vcG9seWZpbGwvQXJyYXlcIjtcclxuXHJcbmNvbnN0IGV4dGVuZFByb3RvdHlwZSA9IGZ1bmN0aW9uKCl7XHJcblx0bGV0IGFyZ3MgPSBcdEFycmF5LmZyb20oYXJndW1lbnRzKTtcclxuXHRsZXQgcHJvdG90eXBlID0gYXJncy5zaGlmdCgpOyBcclxuXHR3aGlsZShhcmdzLmxlbmd0aCA+IDApe1xyXG5cdFx0bGV0IGV4dGVuZGVyID0gYXJncy5zaGlmdCgpO1xyXG5cdFx0ZXh0ZW5kZXIocHJvdG90eXBlKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHRlbmRQcm90b3R5cGU7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IFwiLi4vbm9kZV9tb2R1bGVzL2RvbS1hcGktZXh0ZW5zaW9uL3NyYy9pbmRleFwiOyJdLCJzb3VyY2VSb290IjoiIn0=