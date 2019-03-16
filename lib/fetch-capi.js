const fetch = require('node-fetch');
const handleResponse = require('./handle-response');

module.exports = async (endpoint, options = {}, credentials = {}) => {
	const response = fetch('https://api.ft.com/' + endpoint, {
		...options,
		redirect: 'follow',
		headers: {
			'X-API-key': credentials.apiKey
		},
		agent: httpsAgent
	});

	return handleResponse(response);
};
