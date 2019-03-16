const { URLSearchParams } = require('url');
const fetchAWS = require('./fetch-aws');

const elasticURL = 'https://next-elastic.ft.com/content/item';

const formatQueryString = (params = {}) => {
	return new URLSearchParams(params).toString();
};

const formatPostOptions = (body) => {
	return {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	};
};

const extractSource = (data) => {
	return data._source
};

exports.get = (id, options = {}) => {
	const defaults = {
		_source: ['id', 'type', 'title', 'publishedDate', 'standfirst', 'byline', 'bodyText']
	};

	const queryString = formatQueryString({ ...defaults, ...options });

	return fetchAWS(`${elasticURL}/${id}/_source?${queryString}`);
};

exports.mget = async (ids = [], options = {}) => {
	const defaults = {
		_source: ['id', 'type', 'title', 'publishedDate']
	};

	const queryString = formatQueryString({ ...defaults, ...options });
	const postOptions = formatPostOptions({ ids });

	const data = await fetchAWS(`${elasticURL}/_mget?${queryString}`, postOptions);

	return data.docs.filter((doc) => doc.found).map(extractSource);
};
