const fetchRSS = require('../lib/fetch-rss');

module.exports = () => {
	return fetchRSS('https://www.ft.com/?format=rss')
		.then((items) => {
			const prompt = `Latest news on FT.com at ${new Date().toTimeString()}`;

			const choices = items.map((item) => (
				{
					name: item.title,
					guid: item.guid.text
				}
			));

			return { prompt, choices };
		});
};
