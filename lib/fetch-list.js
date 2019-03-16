const fetchCAPI = require('./fetch-capi');
const elastic = require('./fetch-elastic');

const formatUUID = (id) => id.replace(/^https?:\/\/api\.ft\.com\/things\//, '');

module.exports = async (uuid) => {
	const list = await fetchCAPI(`https://api.ft.com/lists/${uuid}`);
	const uuids = list.items.map((item) => formatUUID(item.id));
	return elastic.mget(uuids);
};
