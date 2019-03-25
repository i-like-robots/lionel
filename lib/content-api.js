const fetchCAPI = require('./fetch-capi');

const extractUUID = (id) => {
	return id.match(/\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/).pop();
};

async function list (uuid) {
	const list = await fetchCAPI(`https://api.ft.com/lists/${uuid}`);

	// The document store API does support a POST request to retrieve multiple
	// content items but this is not currently available via API gateway.
	return Promise.all(list.items.map((item) => content(item.id)));
}

async function content (uuid) {
	return fetchCAPI(`https://api.ft.com/content/${extractUUID(uuid)}`);
}

module.exports = { list, content };
