const chalk = require('chalk');
const wrap = require('word-wrap');

const display = {
	width: 100,
	indent: '  '
};

const header = (model) => {
	const partial = [];

	partial.push(chalk.bold.underline.blue(model.title));
	partial.push(chalk.blueBright(model.byline));

	return partial.join('\n');
};

const subheader = (model) => {
	const partial = [];

	partial.push(`Posted on ${chalk.bold(model.publishedDate)}`);

	if (model.displayConcept) {
		partial.push('in');

		if (model.displayConceptPrefix) {
			partial.push(chalk.magentaBright(model.displayConceptPrefix));
		}

		partial.push(chalk.bold(model.displayConcept));
	}

	return chalk.magenta(partial.join(' '));
};

module.exports = (model) => {
	const template = [];

	template.push(header(model));

	template.push(subhead(model));

	template.push(model.bodyText);

	template.push(chalk.yellow(`View the article at ${url}`));

	return wrap(template.join('\n\n'), display);
};
