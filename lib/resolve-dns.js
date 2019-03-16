const dns = require('dns');
const util = require('util');

const cache = new Map();
const resolveCname = util.promisify(dns.resolveCname);

module.exports = async (url) => {
	if (/\.amazonaws\.com$/.test(url)) {
		return url;
	}

	if (cache.has(url)) {
		return cache.get(url);
	}

	const resolvedName = await resolveCname(url);

	cache.set(url, resolvedName).get(url);

	return resolvedName;
};
