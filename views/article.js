const chalk = require('chalk');

const RHYTHM = '\n\n';

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
		partial.push(chalk.bold(model.displayConcept));
	}

	if (model.displayConceptPrefix) {
		partial.push(`(${chalk.magentaBright(model.displayConceptPrefix)})`);
	}

	return chalk.magenta(partial.join(' '));
};

module.exports = (model) => {
	const template = [];

	template.push(header(model));

	template.push(subheader(model));

	template.push(model.bodyText);

	template.push(chalk.yellow(`View the article in full at: ${model.url}`));

	return template.join(RHYTHM);
};
