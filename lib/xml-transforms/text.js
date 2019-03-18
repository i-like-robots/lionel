module.exports = ($element) => {
	const text = $element.text().trim();

	if (text) {
		// Remove newlines and excessive whitespace
		return text
			// Remove any newlines
			.replace(/\n/g, '')
			// Remove extraneous whitespace
			.replace(/\s{2,}/g, ' ')
			// Replace custom ellipsis
			.replace(/\s*\.\s*\.\s*\./g, '…')
			.trim();
	} else {
		return '';
	}
};
