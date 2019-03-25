const api = require('../lib/content-api');
const listUUIDs = require('../lib/list-uuids');

const isNew = (date) => {
	return Date.now() - Date.parse(date) < 1000 * 60 * 60;
};

const isArticle = (content) => {
	return content.type === 'http://www.ft.com/ontology/content/Article';
};

module.exports = async (uuid) => {
	const prompt = `The latest in ${listUUIDs.get(uuid)} at ${new Date().toTimeString()}`;

	const items = await api.list(uuid);

	const articles = items.filter(isArticle).slice(0, 10);

	const choices = articles.map((article) => {
		return {
			name: article.title,
			uuid: article.id,
			new: isNew(article.publishedDate)
		};
	});

	return { prompt, choices };
};
