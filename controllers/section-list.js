const listUUIDs = require('../lib/list-uuids');

module.exports = () => {
	const prompt = 'Select section to view latest news from FT.com';

	const choices = [];

	for (const [uuid, name] of listUUIDs) {
		choices.push({ uuid, name });
	}

	return { prompt, choices };
};
