const { URLSearchParams } = require('url');
const fetchAWS = require('./fetch-aws');

const elasticURL = 'https://next-elastic.ft.com/content/item';

const formatQueryString = (parameters = {}) => {
	return new URLSearchParams(parameters).toString();
};

const formatPostOptions = (requestBody) => {
	return {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: {
			'Content-Type': 'application/json'
		}
	};
};

const extractSource = (data) => {
	return data._source
};

exports.get = (id, options = {}) => {
	const defaultOptions = {
		_source: ['title', 'standfirst', 'byline', 'publishedDate', 'bodyText']
	};

	const queryString = formatQueryString({ ...defaultOptions, ...options });

	return fetchAWS(`${elasticURL}/${id}/_source?${queryString}`);
};

exports.mget = async (ids = [], options = {}) => {
	const defaultOptions = {
		_source: ['teaser.*']
	};

	const queryString = formatQueryString({ ...defaultOptions, ...options });
	const postOptions = formatPostOptions({ ids });

	const data = await fetchAWS(`${elasticURL}/_mget?${queryString}`, postOptions);

	return data.docs.filter((doc) => doc.found).map(extractSource);
};

exports.search = async (query = {}, options = {}) => {
	const defaultOptions = {
		from: 0,
		size: 10,
		sort: 'publishedDate:desc',
		_source: ['teaser.*']
	};

	const queryString = formatQueryString({ ...defaultOptions, ...options });
	const postOptions = formatPostOptions(query);

	const data = await fetchAWS(`${elasticURL}/_search?${queryString}`, postOptions);

	return data.hits.hits.map(extractSource);
};
