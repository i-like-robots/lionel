const wrap = require('wrap-ansi');
const ansi = require('ansi-escapes');
const chalk = require('chalk');
const Base = require('./base');

const defaults = {
	callback: new Function(),
	help: 'Use arrow keys to scroll, backspace or escape to return, ctl + c to quit'
};

class Scrollable extends Base {
	constructor (text = '', options = {}) {
		super(defaults, options);

		this.text = wrap(text, this.width);
		this.lines = this.text.split('\n');
		this.position = 0;

		this.on('up', this.up.bind(this));
		this.on('down', this.down.bind(this));
		this.on('escape', this.quit.bind(this));
		this.on('backspace', this.quit.bind(this));

		this.start();
	}

	up () {
		if (this.position > 0) {
			this.position--;
			this.render();
		} else {
			this.rl.output.write(ansi.beep);
		}
	}

	down () {
		if (this.position < this.lines.length - this.height) {
			this.position++;
			this.render();
		} else {
			this.rl.output.write(ansi.beep);
		}
	}

	quit () {
		this.stop();
		this.options.callback();
	}

	toArray () {
		// Allow some room for the help text
		const height = this.position + this.height - 2;
		const buffer = this.lines.slice(this.position, height);

		buffer.push('', chalk.dim(this.options.help));

		return buffer;
	}

	toString () {
		return this.toArray().join('\n');
	}
}

module.exports = Scrollable;
