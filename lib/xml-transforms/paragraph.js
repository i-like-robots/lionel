const text = require('./text');
const hr = require('./hr');

const separator = /^(?:[\-\*]\s?){3,}$/g;

module.exports = ($element) => {
	const contents = text($element);

	// Often editors add their own style of horizontal rule
	if (separator.test(contents) || contents === '…') {
		return hr();
	} else {
		return contents;
	}
};
