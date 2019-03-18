const text = require('./text');

module.exports = ($element) => {
	const contents = text($element.find('p'));
	const source = text($element.find('cite'));

	if (source) {
		return `“${contents}”\n— ${source}`;
	} else {
		return `“${contents}”`;
	}
};
