const cheerio = require('cheerio');

// Match a string of 3 or more characters with or without a space inbetween.
const visualSeparator = /^(?:[\-\*\.]\s?){3,}$/g;

module.exports = (xml) => {
	const $ = cheerio.load(xml, { decodeEntities: false, normalizeWhitespace: true });

	const $targets = $('body').children('p,pull-quote');

	const lines = [];

	$targets.each((i, target) => {
		const $target = $targets.eq(i);

		if (target.name === 'p') {
			const text = $target.text().trim();

			if (visualSeparator.test(text)) {
				lines.push('---');
			} else {
				lines.push(text);
			}
		}

		if (target.name === 'pull-quote') {
			const text = $target.find('pull-quote-text').text().trim();
			const source = $target.find('pull-quote-source').text().trim();

			lines.push(`“${text}”`);

			if (source) {
				lines.push(`— ${source}`);
			}
		}
	});

	return lines.join('\n\n');
};
