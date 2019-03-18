const cheerio = require('cheerio');

const transforms = new Map([
	['p', require('./xml-transforms/paragraph') ],
	['blockquote', require('./xml-transforms/blockquote') ],
	['pull-quote', require('./xml-transforms/pull-quote') ],
	['hr', require('./xml-transforms/hr') ],
	['h2', require('./xml-transforms/heading') ],
	['h3', require('./xml-transforms/heading') ],
	['h4', require('./xml-transforms/heading') ],
	['h5', require('./xml-transforms/heading') ],
	['h6', require('./xml-transforms/heading') ],
	['ul', require('./xml-transforms/ul') ],
	['ol', require('./xml-transforms/ol') ],
]);

const elements = Array.from(transforms.keys());

const clean = (text) => text.replace('\s{2,}', ' ');

module.exports = (xml) => {
	const $ = cheerio.load(xml, { decodeEntities: false, normalizeWhitespace: true });

	const $targets = $('body').children(elements.join());

	const lines = [];

	$targets.each((i, target) => {
		const transform = transforms.get(target.name);
		const output = transform($targets.eq(i));

		if (output) {
			lines.push(clean(output));
		}
	});

	return lines.join('\n\n');
};
