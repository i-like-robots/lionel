const chalk = require('chalk');
const Base = require('./base');

const defaults = {
	callback: new Function(),
	help: 'Use arrow keys to highlight an option, return to select, ctrl + c to quit'
};

const blink = (text) => '\033[5m' + text + '\033[0m';

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
		// Allow cursor to wrap around
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

		buffer.push(chalk.white(this.prompt), '');

		this.choices.forEach((item, i) => {
			const name = `${item.name}${item.new ? chalk.yellow(blink(' new!')) : ''}`;

			if (this.position === i) {
				buffer.push(chalk.cyan(`‣ ${name}`));
			} else {
				buffer.push(`  ${name}`);
			}
		});

		buffer.push('', chalk.dim(this.options.help));

		return buffer;
	}

	toString () {
		return this.toArray().join('\n');
	}
}

module.exports = Menu;
