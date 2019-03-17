const cheerio = require('cheerio');

const ignore = ['recommended', 'ft-related', 'promo-box', 'pull-quote', 'big-number', 'table'];

// Paragraph marks (pilcrows) may be used legitimately so double up to be safe!
const paragraphMark = '¶¶';

// This will greedily find any whitespace around the marks so we can remove it.
// There will often be whitespace as the .text() method works recursively on each element.
const paragraphRegexp = new RegExp(`\\s*${paragraphMark}\\s*`, 'g')

const paragraphReplace = '\n\n';

// Match a string of 3 or more characters with or without a space inbetween.
const visualSeparator = /^(?:[\-\*\.]\s?){3,}$/g;

module.exports = (xml) => {
	const $ = cheerio.load(xml, { decodeEntities: false, normalizeWhitespace: true });

	$(ignore.join()).remove();

	const $paragraphs = $('p');

	// 1. Delimit each paragraph with a special character. We can't add newlines at
	//    this stage as whitespace normalization is enabled and they'll be cleaned up.
	//
	// 2. Remove any paragraphs which are intended to be visual separators, e.g.:
	//    <p>---</p> or <p>. . .</p> or <p>* * *</p>
	$paragraphs.each((i) => {
		const $ = $paragraphs.eq(i);
		const text = $.text().trim();

		if (text.length && !visualSeparator.test(text)) {
			$.prepend(paragraphMark); // 1
		} else {
			$.remove(); // 2
		}
	});

	return $.root().text().replace(paragraphRegexp, paragraphReplace).trim();
};
