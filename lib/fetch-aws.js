const aws4 = require('aws4');
const { URL } = require('url');
const fetch = require('node-fetch');
const httpsAgent = require('./https-agent');
const resolveDNS = require('./resolve-dns');
const handleResponse = require('./handle-response');

module.exports = async (url, options = {}, credentials = {}) => {
	const url = new URL(url);

	// Ensure we sign the actual service URL and not a load balancer URL
	const hostname = resolveDNS(url.host);

	const signedOptions = {
		method: options.method,
		host: hostname,
		path: url.pathname,
		body: options.body,
		headers: options.headers
	};

	aws4.sign(signedOptions, {
		accessKeyId: credentials.awsAccessKey,
		secretAccessKey: credentials.awsSecretAccessKey
	});

	options.headers = signable.headers;

	const response = await fetch(`${url.protocol}//${signedOptions.host}${signedOptions.path}`, {
		...options,
		agent: httpsAgent
	});

	return handleResponse(response);
};
