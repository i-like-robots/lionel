const chalk = require('chalk');
const { EOL } = require('os');
const Base = require('./base');

const defaults = {
	callback: new Function(),
	message: 'Use arrow keys to highlight an option, return to select, ctrl + c to quit'
};

class Menu extends Base {
	constructor (items = [], options = {}) {
		super(defaults, options);

		this.items = items;
		this.position = 0;

		this.on('up', this.up.bind(this));
		this.on('down', this.down.bind(this));
		this.on('enter', this.select.bind(this));
		this.on('return', this.select.bind(this));

		this.start();
	}

	up () {
		if (this.position === 0) {
			this.position = this.items.length - 1;
		} else {
			this.position--;
		}

		this.render();
	}

	down () {
		if (this.position === this.items.length - 1) {
			this.position = 0;
		} else {
			this.position++;
		}

		this.render();
	}

	select () {
		this.stop();
		this.options.callback(this.items[this.position]);
	}

	toString () {
		const buffer = this.items.map((item, i) => {
			if (this.position === i) {
				return chalk.cyan(item.name);
			} else {
				return item.name;
			}
		});

		return buffer.concat([ EOL + chalk.dim(this.options.message) ]).join(EOL);
	}
}

module.exports = Menu;
