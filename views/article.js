const chalk = require('chalk');

const RHYTHM = '\n\n';

const header = (model) => {
	const partial = [];

	partial.push(chalk.bold.underline.blue(model.title));

	if (model.standfirst) {
		partial.push(chalk.bold.cyan(model.standfirst));
	}

	return partial.join('\n');
};

const subheader = (model) => {
	const partial = [];

	partial.push(`Posted on ${chalk.bold(model.publishedDate)}`);

	if (model.byline) {
		partial.push(`Written by ${model.byline}`);
	}

	partial.push('');

	return chalk.magenta(partial.join('. '));
};

module.exports = (model) => {
	const template = [];

	template.push(header(model));

	template.push(subheader(model));

	template.push(model.bodyText);

	template.push(chalk.yellow(`View the article in full at: ${model.url}`));

	template.push('');

	return template.join(RHYTHM);
};
