const transforms = new Map([
	[/\n/g, ' '],
	[/\s{2,}/g, ' '],
	// Replace custom ellipsis
	[/\.\.\./g, '…'],
	[/\. \. \./g, '…'],
]);

module.exports = ($element) => {
	let text = $element.text();

	if (text) {
		for (const [find, replace] of transforms) {
			text = text.replace(find, replace);
		}

		return text.trim();
	}
};
