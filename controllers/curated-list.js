const fetchList = require('../lib/fetch-list');
const listUUIDs = require('../lib/list-uuids');

const isNew = (date) => {
	return Date.now() - Date.parse(date) < 1000 * 60 * 60;
};

module.exports = async (uuid) => {
	const prompt = `Latest news in ${listUUIDs.get(uuid)} at ${new Date().toTimeString()}`;

	const listItems = await fetchList(uuid);

	const choices = listItems.map((item) => {
		return {
			name: item.title,
			uuid: item.id,
			new: isNew(item.publishedDate)
		};
	});

	return { prompt, choices };
};
