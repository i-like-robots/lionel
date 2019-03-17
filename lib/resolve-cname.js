const dns = require('dns');
const util = require('util');

const cache = new Map();
const resolveCname = util.promisify(dns.resolveCname);

module.exports = async (domain) => {
	if (/\.amazonaws\.com$/.test(domain)) {
		return domain;
	}

	if (cache.has(domain)) {
		return cache.get(domain);
	}

	const [ resolvedName ] = await resolveCname(domain);

	if (resolvedName) {
		cache.set(domain, resolvedName);
		return resolvedName;
	} else {
		throw Error(`Could not resolve CNAME for ${domain}`);
	}
};
