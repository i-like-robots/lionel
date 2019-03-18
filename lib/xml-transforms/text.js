module.exports = ($element) => {
	const text = $element.text().trim();

	if (text) {
		// Remove newlines and excessive whitespace
		return text.replace(/\n/g, ' ').replace(/\s{2, }/g, ' ').trim();
	} else {
		return '';
	}
};
