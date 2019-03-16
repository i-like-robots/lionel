const https = require('https');
const nodeFetch = require('node-fetch');

const httpsAgent = new https.Agent({ keepAlive: true });

module.exports = async (url, options = {}) => {
	const response = await nodeFetch(url, {
		...options,
		timeout: 3000,
		agent: httpsAgent
	});

	if (response.ok) {
		const contentType = response.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			return response.json();
		} else {
			return response.text();
		}
	} else {
		throw Error(`Request to ${response.url} responded with a ${response.status}`);
	}
};
