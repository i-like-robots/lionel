const fetchHTTP = require('./fetch-http');

module.exports = async (url) => {
	return fetchHTTP(url, {
		redirect: 'follow',
		headers: {
			'x-api-key': global.key
		}
	})
};
