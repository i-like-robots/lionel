const fetchHTTP = require('./fetch-http');
const credentials = require('../credentials');

module.exports = async (url) => {
	return fetchHTTP(url, {
		redirect: 'follow',
		headers: {
			'X-API-key': credentials.apiKey
		}
	})
};
