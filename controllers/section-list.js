const listUUIDs = require('../lib/list-uuids');

module.exports = () => {
	const prompt = 'Select a section to view the latest news from FT.com';

	const choices = [];

	for (const [uuid, name] of listUUIDs) {
		choices.push({ uuid, name });
	}

	return { prompt, choices };
};
