const LRU = require('lru-cache');
const fetchHTTP = require('./fetch-http');

// Cache API requests for 60 seconds to minimise over fetching
const cache = new LRU({ maxAge: 1000 * 60 });

module.exports = async (url) => {
	const cached = cache.get(url);

	if (cached) {
		return cached;
	}

	const data = await fetchHTTP(url, {
		redirect: 'follow',
		headers: {
			'x-api-key': global.key
		}
	});

	cache.set(url, data);

	return data;
};
