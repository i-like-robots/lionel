const fetch = require('node-fetch');
const httpsAgent = require('./https-agent');
const handleResponse = require('./handle-response');
const credentials = require('../credentials');

module.exports = async (url, options = {}) => {
	const response = await fetch(url, {
		...options,
		redirect: 'follow',
		headers: {
			'X-API-key': credentials.apiKey
		},
		timeout: 3000,
		agent: httpsAgent
	});

	return handleResponse(response);
};
