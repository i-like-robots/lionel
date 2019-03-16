const aws4 = require('aws4');
const { URL } = require('url');
const fetchHTTP = require('./fetch-http');
const resolveCNAME = require('./resolve-cname');
const credentials = require('../credentials');

module.exports = async (url, options = {}) => {
	const parsedURL = new URL(url);

	// Ensure we sign the actual service URL and not a load balancer URL
	const hostname = await resolveCNAME(parsedURL.host);

	const signedOptions = {
		method: options.method,
		host: hostname,
		path: parsedURL.pathname,
		body: options.body,
		headers: options.headers
	};

	aws4.sign(signedOptions, {
		accessKeyId: credentials.awsAccessKey,
		secretAccessKey: credentials.awsSecretAccessKey
	});

	options.headers = signedOptions.headers;

	return fetchHTTP(`${parsedURL.protocol}//${signedOptions.host}${signedOptions.path}`, options);
};
