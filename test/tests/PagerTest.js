import Utils from "test/helpers/Utils";
import Pager from "src/utils/Pager";

describe("Pager Tests", function() {
    beforeAll(function(done){
        window.document.body.innerHTML = window.__html__["test/sites/utils/PagerTest.html"];
        done();
    });
    
    it("new Pager()", function(done){        
        const pages = ["page-1", "page-2", "page-3", "page-4"];        
        const pager = new Pager(pages);
        
        expect(pager).toBeDefined();
        expect(pager.pages).toBe(pages);
        expect(pager.get()).toBeUndefined();       
        
        done();
    });
    
    it("next page", function(done){        
        const pages = ["page-1", "page-2", "page-3", "page-4"];        
        const pager = new Pager(pages);
        
        for(let i = 0; i < pages.length; i++){
            let page = pager.next();       
            expect(page).toBeDefined();
            expect(page).toBe(pages[i]);
        }
        
        let page = pager.next();       
        expect(page).toBeUndefined();
        expect(pager.index).toBe(pages.length);
        
        pager.next();       
        expect(pager.index).toBe(pages.length);
        
        done();
    });
    
    afterAll(function(done){
        window.document.body.innerHTML = "";
        done();
    });
});