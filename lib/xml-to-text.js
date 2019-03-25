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

const selector = Array.from(transforms.keys()).join();

module.exports = (xml) => {
	const $ = cheerio.load(xml);

	const $targets = $('body').children(selector);

	const lines = [];

	$targets.each((i, target) => {
		const transform = transforms.get(target.name);
		const output = transform($targets.eq(i));

		if (output) {
			lines.push(output);
		}
	});

	return lines.join('\n\n');
};
