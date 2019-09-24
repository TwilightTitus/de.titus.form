//dependencies from libs
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

// own dependencies
import Constants from "./Constants";
import EventUtils from "./utils/EventUtils";
import PageBuilder from "./Page";


const LOGGER = LoggerFactory.newLogger("de.titus.Pager");

const Pager = function(thePages, aForm){
    this.data = {
        form : aForm,
        pages : thePages,
        index : -1
    };
};

Pager.prototype.get = function(){
    if(this.index >= 0 && this.index < this.pages.length)
        return this.pages[this.index];
};

Pager.prototype.to = function(aIndex){
    if(aIndex >= 0 && aIndex < this.pages.length)
        this.index = aIndex;
};

Pager.prototype.next = function(){
    this.index++;
    if(this.index < this.pages.length)
        return this.get();
};

Pager.prototype.prev = function(){
    if(this.index >= 0)
        this.index--; 
    return this.get();
};


const PagerBuilder = function(aForm){
    let pages = [];
    aForm.data.element.find(Constants.STRUCTURELEMENTS.PAGE.selector).forEach((function(anElement){
        pages.push(PageBuilder(anElement, aForm));
    }).bind(this));
    
    return Promise.all(pages).then(function(pages){
        return new Pager(pages, aForm);
    });
};
export { Pager, PagerBuilder};
export default PagerBuilder;


