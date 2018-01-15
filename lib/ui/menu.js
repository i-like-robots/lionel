const chalk = require('chalk');
const Base = require('./base');

const defaults = {
	callback: new Function(),
	message: 'Use arrow keys to highlight an option, return to select, ctrl + c to quit'
};

class Menu extends Base {
	constructor (prompt, choices = [], options = {}) {
		super(defaults, options);

		this.prompt = prompt;
		this.choices = choices;
		this.position = 0;

		this.on('up', this.up.bind(this));
		this.on('down', this.down.bind(this));
		this.on('enter', this.select.bind(this));
		this.on('return', this.select.bind(this));

		this.start();
	}

	up () {
		if (this.position === 0) {
			this.position = this.choices.length - 1;
		} else {
			this.position--;
		}

		this.render();
	}

	down () {
		if (this.position === this.choices.length - 1) {
			this.position = 0;
		} else {
			this.position++;
		}

		this.render();
	}

	select () {
		this.stop();
		this.options.callback(this.choices[this.position]);
	}

	toArray () {
		const buffer = [];

		buffer.push(chalk.white(this.prompt));
		buffer.push('');

		this.choices.forEach((item, i) => {
			if (this.position === i) {
				buffer.push(chalk.cyan(`‣ ${item.name}`));
			} else {
				buffer.push(`  ${item.name}`);
			}
		});

		buffer.push('');
		buffer.push(chalk.dim(this.options.message));

		return buffer;
	}

	toString () {
		return this.toArray().join('\n');
	}
}

module.exports = Menu;
