const wrap = require('wrap-ansi');
const chalk = require('chalk');
const { EOL } = require('os');
const Base  = require('./base');

const defaults = {
	callback: new Function(),
	message: 'Use arrow keys to scroll, backspace or escape to return, ctl + c to quit'
};

class Scrollable extends Base {
	constructor (text = '', options = {}) {
		super(defaults, options);

		this.text = wrap(text, this.width);
		this.lines = this.text.split(EOL);
		this.position = 0;

		this.on('up', this.up.bind(this));
		this.on('down', this.down.bind(this));
		this.on('escape', this.quit.bind(this));
		this.on('backspace', this.quit.bind(this));

		this.start();
	}

	get width () {
		return Math.min(process.stdout.columns, 80);
	}

	get height () {
		return process.stdout.rows - 3;
	}

	up () {
		if (this.position > 0) {
			this.position--;
			this.render();
		}
	}

	down () {
		if (this.position < this.lines.length - this.height) {
			this.position++;
			this.render();
		}
	}

	quit () {
		this.stop();
		this.options.callback();
	}

	toString () {
		const buffer = this.lines.slice(this.position, this.position + this.height);
		return buffer.concat([ EOL + chalk.dim(this.options.message) ]).join(EOL);
	}
}

module.exports = Scrollable;
