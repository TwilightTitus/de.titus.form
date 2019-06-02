const UUIDTEMPLATE = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx';
const uuid = function() {	
	return UUIDTEMPLATE.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0
		let v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

const domId = function() {	
	return "dom-id-" + uuid();
};
export default {
	uuid: uuid,
	domId: domId
};