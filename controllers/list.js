const fetchRSS = require('../lib/fetch-rss');

module.exports = () => {
	return fetchRSS('https://www.ft.com/?format=rss')
		.then((items) => {
			return items.map((item) => {
				return {
					name: item.title,
					value: item.guid.text
				};
			})
		})
};
