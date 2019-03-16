const aws4 = require('aws4');
const { URL } = require('url');
const fetch = require('node-fetch');
const handleResponse = require('./handle-response');

module.exports = async (url, options = {}, credentials = {}) => {
	const url = new URL(url);

	const signOptions = {
		method: options.method,
		host: url.host,
		path: url.pathname,
		body: options.body,
		headers: options.headers
	};

	aws4.sign(signOptions, {
		accessKeyId: credentials.awsAccessKey,
		secretAccessKey: credentials.awsSecretAccessKey
	});

	options.headers = signable.headers;

	const response = await fetch(`${url.protocol}//${signable.host}${signable.path}`, options);
	return handleResponse(response);
};
