const { get } = require('https');
const FeedMe = require('feedme');

module.exports = (url) => {
	return new Promise((resolve, reject) => {
		const parser = new FeedMe();

		get(url, (response) => {
			if (response.statusCode !== 200) {
				return reject(`${response.statusCode} ${response.statusMessage}`);
			}

			const items = [];

			parser.on('item', (item) => items.push(item));

			parser.on('end', () => resolve(items));

			parser.on('error', reject);

			response.pipe(parser);
		})
			.on('error', reject);
	});
};
