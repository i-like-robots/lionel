const { get } = require('https');
const FeedMe = require('feedme');
const HttpError = require('http-errors');

module.exports = (url) => {
	return new Promise((resolve, reject) => {
		const parser = new FeedMe();

		const items = [];

		get(url, (response) => {
			if (response.statusCode !== 200) {
				return reject(new HttpError(response.statusCode));
			}

			parser.on('item', (item) => items.push(item));

			parser.on('end', () => resolve(items));

			parser.on('error', reject);

			response.pipe(parser);
		})
			.on('error', reject);
	});
};