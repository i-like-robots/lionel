const text = require('./text');

module.exports = ($element) => {
	const $items = $element.find('li');
	const items = $items.each((i) => text($items.eq(i)));

	return items.map((item, i) => `${i}. ${item}`).join('\n');
};
