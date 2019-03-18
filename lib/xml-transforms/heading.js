const text = require('./text');

module.exports = ($element) => {
	return `# ${text($element)}`;
};
