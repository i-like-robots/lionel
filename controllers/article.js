const unescape = require('unescape');
const fetchJSON = require('../lib/fetch-json');
const Article = require('../model/article');
const render = require('../views/article');

const FIELDS = [
	'id',
	'type',
	'title',
	'byline',
	'publishedDate',
	'genreConcept',
	'brandConcept',
	'displayConcept',
	'bodyText',
];

module.exports = (guid) => {
	return fetchJSON(`http://next-elastic.ft.com/content/item/${guid}/_source?_source=${FIELDS}`)
		.then((data) => {
			if (data.type !== 'article') {
				return Promise.reject('The requested content is not an article.');
			}

			return render(new Article(data));
		});
};
