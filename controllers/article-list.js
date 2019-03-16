const fetchList = require('../lib/fetch-list');
const listUUIDs = require('../lib/list-uuids');

const isNew = (date) => {
	return Date.now() - Date.parse(date) < 1000 * 60 * 60;
};

module.exports = async (uuid) => {
	const prompt = `Latest news in ${listUUIDs.get(uuid)} at ${new Date().toTimeString()}`;

	const items = await fetchList(uuid);

	const articles = items.filter((item) => item.type === 'article').slice(0, 10);

	const choices = articles.map((article) => {
		return {
			name: article.title,
			uuid: article.id,
			new: isNew(article.publishedDate)
		};
	});

	return { prompt, choices };
};
