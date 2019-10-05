import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

// Field Types
import SingleFieldBuilder from "src/fields/SingleField";
import ContainerFieldBuilder from "src/fields/ContainerField";
import ListFieldBuilder from "src/fields/ListField";


const LOGGER = LoggerFactory.newLogger("de.titus.form.fields.FieldUtils");
const FIELDSELECTORS = [ Constants.STRUCTURELEMENTS.SINGLEFIELD.selector, Constants.STRUCTURELEMENTS.CONTAINERFIELD.selector, Constants.STRUCTURELEMENTS.LISTFIELD.selector ].join(", ");


const buildField = function(anElement, aContainer, aForm) {
    if(LOGGER.isDebugEnabled)
        LOGGER.logDebug(["buildField()", anElement, aContainer, aForm]);
    
    return new Promise(function(resolve){
        let field = anElement.data("de.titus.form.Field");
        if(typeof field !== "undefined")
            return field;
        
        let builder = undefined;        
        if (anElement.is(Constants.STRUCTURELEMENTS.SINGLEFIELD.selector))
            builder = SingleFieldBuilder;
        else if (anElement.is(Constants.STRUCTURELEMENTS.CONTAINERFIELD.selector))
            builder = ContainerFieldBuilder;
        else if (anElement.is(Constants.STRUCTURELEMENTS.LISTFIELD.selector))
            builder = ListFieldBuilder;
        else
            return;
        
       return builder(anElement, aContainer, aForm).then(function(aField){
            anElement.data("de.titus.form.Field", aField);
            anElement.formField = aField;
            return aField;
        });
    });
};

const buildChildFields = function(anElement, aContainer, aForm) {
    if(LOGGER.isDebugEnabled)
        LOGGER.logDebug(["buildChildFields()", anElement, aContainer, aForm]); 

    let results = [];
    for(let i = 0; i < anElement.children.length; i++){
        let item = anElement.children.item(i);
        if (item.is(FIELDSELECTORS))
            results.push(buildField(item, aContainer, aForm));
        else {
            let fields = buildChildFields(item, aContainer, aForm);
            if (fields)
                results = results.concat(fields);
        }
    }
    return Promise.all(results);
};

const getAssociatedField = function(anElement) {
    let field = anElement.data("de.titus.form.Field");
	if (field)
		return field;

	return getAssociatedField(anElement.parent());
};

const FieldUtils = {
        buildField : buildField,
        buildChildFields : buildChildFields,
        getAssociatedField : getAssociatedField
};

export default FieldUtils;



