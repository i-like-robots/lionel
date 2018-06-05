const fetchRSS = require('../lib/fetch-rss');

const IS_NEW = 1 * 60 * 60 * 1000;

module.exports = () => {
	return fetchRSS('https://www.ft.com/?format=rss')
		.then((items) => {
			const prompt = `Latest news on FT.com at ${new Date().toTimeString()}`;

			const choices = items.map((item) => (
				{
					name: item.title,
					guid: item.guid.text,
					new: Date.now() - Date.parse(item.pubdate) < IS_NEW,
				}
			));

			return { prompt, choices };
		});
};
