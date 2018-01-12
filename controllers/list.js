const fetchRSS = require('../lib/fetch-rss');

module.exports = () => {
	return fetchRSS('https://www.ft.com/?format=rss')
		.then((items) => {
			const message = `Latest stories on FT.com ${new Date().toISOString()}`;

			const choices = items.map((item) => (
				{
					name: item.title,
					value: item.guid.text
				}
			));

			return { choices, message };
		});
};
