const elastic = require('../lib/fetch-elastic');
const Article = require('../model/article');
const render = require('../views/article');

module.exports = async (uuid) => {
	const data = await elastic.get(uuid);

	if (data.type !== 'article') {
		throw Error('The requested content is not an article.');
	}

	return render(new Article(data));
};
