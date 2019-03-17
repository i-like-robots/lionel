const api = require('../lib/content-api');
const Article = require('../model/article');
const render = require('../views/article');

module.exports = async (uuid) => {
	const data = await api.content(uuid);

	if (data.type !== 'http://www.ft.com/ontology/content/Article') {
		throw Error('The requested content is not an article.');
	}

	return render(new Article(data));
};
