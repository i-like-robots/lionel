const fetchCAPI = require('./fetch-capi');
const formatID = require('./format-capi-id');
const elastic = require('./fetch-elastic');

module.exports = async (uuid) => {
	const list = await fetchCAPI(`https://api.ft.com/lists/${uuid}`);
	const uuids = list.items.map((item) => formatID(item.id));
	return elastic.mget(uuids);
};
