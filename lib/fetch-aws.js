const aws4 = require('aws4');
const { URL } = require('url');
const fetch = require('node-fetch');
const httpsAgent = require('./https-agent');
const resolveDNS = require('./resolve-dns');
const handleResponse = require('./handle-response');
const credentials = require('../credentials');

module.exports = async (url, options = {}) => {
	const parsedURL = new URL(url);

	// Ensure we sign the actual service URL and not a load balancer URL
	const [ cname ] = await resolveDNS(parsedURL.host);

	if (!cname) {
		throw Error(`Could not resolve CNAME for ${url}`);
	}

	const signedOptions = {
		method: options.method,
		host: cname,
		path: parsedURL.pathname,
		body: options.body,
		headers: options.headers
	};

	aws4.sign(signedOptions, {
		accessKeyId: credentials.awsAccessKey,
		secretAccessKey: credentials.awsSecretAccessKey
	});

	options.headers = signedOptions.headers;

	const response = await fetch(`${parsedURL.protocol}//${signedOptions.host}${signedOptions.path}`, {
		...options,
		timeout: 3000,
		agent: httpsAgent
	});

	return handleResponse(response);
};
