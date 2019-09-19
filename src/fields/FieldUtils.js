import Constants from "src/Constants";
import LoggerFactory from "modules/de.titus.logging/src/LoggerFactory";

// Field Types
import SingleField from "src/fields/SingleField";
import ContainerField from "src/fields/ContainerField";
import ListField from "src/fields/ListField";


const FIELDSELECTORS = [ Constants.STRUCTURELEMENTS.SINGLEFIELD.selector, Constants.STRUCTURELEMENTS.CONTAINERFIELD.selector, Constants.STRUCTURELEMENTS.LISTFIELD.selector ].join(", ");


const buildField = function(anElement, aContainer, aForm) {     
    let field = anElement.data("de.titus.form.Field");
    if (!field) {
        if (this.is("[data-form-field]"))
            field = new SingleField(anElement, aConatiner, aForm);
        else if (this.is("[data-form-container-field]"))
            field = new ContainerField(anElement, aConatiner, aForm);
        else if (this.is("[data-form-list-field]"))
            field = new ListField(anElement, aConatiner, aForm);

        if (field)
            anElement.data("de.titus.form.Field", field);
    }

    return field;
};

const buildChildFields = function(anElement, aContainer, aForm) {
	let result = [];
	anElement.children.forEach((function(aParent, aContainer, aForm, anElement) {
		if (anElement.is(Field.FIELDSELECTORS))
			result.push(buildField(anElement, aContainer, aForm));
		else {
			let children = getChildFields(anElement, aContainer, aForm);
			if (children)
				this.concat(children);
		}
	}).bind(result, anElement, aContainer, aForm));

	return result;
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



