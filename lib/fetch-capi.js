const fetch = require('node-fetch');
const handleResponse = require('./handle-response');

module.exports = async (endpoint, credentials = {}) => {
	const response = fetch('https://api.ft.com/' + endpoint, {
		redirect: 'follow',
		headers: {
			'X-API-key': credentials.key
		}
	});

	return handleResponse(response);
};
