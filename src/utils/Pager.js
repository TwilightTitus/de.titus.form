const Pager = function(thePages){
    this.pages = thePages;
    this.index = -1;
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

export default Pager;
