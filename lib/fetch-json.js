const { get } = require('https');
const HttpError = require('http-errors');

module.exports = (url) => {
	return new Promise((resolve, reject) => {
		get(url, (response) => {
			if (response.statusCode !== 200) {
				return reject(new HttpError(response.statusCode));
			}

			const data = [];

			response.on('data', (chunk) => data.push(chunk));

			response.on('error', reject);

			response.on('end', () => {
				let json;

				try {
					json = JSON.parse(data.join(''));
				} catch (error) {
					reject('Invalid JSON');
				}

				resolve(json);
			});
		})
			.on('error', reject);
	});
};
