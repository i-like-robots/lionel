const wrap = require('wrap-ansi');
const ansi = require('ansi-escapes');
const chalk = require('chalk');
const Base = require('./base');

const defaults = {
	callback: new Function(),
	message: 'Use arrow keys to scroll, backspace or escape to return, ctl + c to quit'
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
		const buffer = this.lines.slice(this.position, this.position + this.height);

		buffer.push('');
		buffer.push(chalk.dim(this.options.message));

		return buffer;
	}

	toString () {
		return this.toArray().join('\n');
	}
}

module.exports = Scrollable;
