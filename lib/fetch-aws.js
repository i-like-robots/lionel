const aws4 = require('aws4');
const { URL } = require('url');
const fetchHTTP = require('./fetch-http');
const resolveCname = require('./resolve-cname');
const credentials = require('../credentials');

module.exports = async (url, options = {}) => {
	const parsedURL = new URL(url);

	// Ensure we sign the actual service URL and not a load balancer URL
	const hostname = await resolveCname(parsedURL.host);

	const signedOptions = {
		method: options.method,
		host: hostname,
		path: parsedURL.pathname + parsedURL.search,
		body: options.body,
		headers: options.headers
	};

	aws4.sign(signedOptions, {
		accessKeyId: credentials.awsAccessKey,
		secretAccessKey: credentials.awsSecretAccessKey
	});

	options.headers = signedOptions.headers;

	return fetchHTTP(`https://${signedOptions.host}${signedOptions.path}`, options);
};
