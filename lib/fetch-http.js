const https = require('https');
const nodeFetch = require('node-fetch');

const httpsAgent = new https.Agent({ keepAlive: true });

const handleResponse = (response) => {
	const contentType = response.headers.get('content-type');

	if (contentType && contentType.includes('application/json')) {
		return response.json();
	} else {
		return response.text();
	}
};

module.exports = async (url, options = {}) => {
	const response = await nodeFetch(url, {
		...options,
		timeout: 3000,
		agent: httpsAgent
	});

	const body = await handleResponse(response);

	if (response.ok) {
		return body;
	} else {
		const error = Error(`Request to ${response.url} responded with a ${response.status}`);

		error.status = response.status;
		error.statusText = body.message || response.statusText;

		throw error;
	}
};
