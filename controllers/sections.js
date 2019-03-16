const lists = require('../lib/list-uuids');

module.exports = () => {
	const prompt = 'Select section to view latest news';

	const choices = [];

	for (const [name, uuid] of lists) {
		choices.push({ name, uuid });
	}

	return { prompt, choices };
};
