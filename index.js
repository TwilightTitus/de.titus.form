import pack from "./src";


(function(global){
    global.de = global.de || {};
    global.de.titus = global.de.titus || {};
    global.de.titus.form = global.de.titus.form || pack;
    global.de.titus.form.VERSION = "${version}";    
})(window || global || {});
