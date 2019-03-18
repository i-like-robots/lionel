const text = require('./text');

module.exports = ($element) => {
	const contents = text($element.find('pull-quote-text'));
	const source = text($element.find('pull-quote-source'));

	if (source) {
		return `“${contents}”\n— ${source}`;
	} else {
		return `“${contents}”`;
	}
};
