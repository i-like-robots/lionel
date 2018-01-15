const log = require('log-update');
const wrap = require('wrap-ansi');
const chalk = require('chalk');
const { EOL } = require('os');

const defaults = {
	callback: () => {},
	message: 'Use arrow keys to scroll, backspace to return, or ctl + c to quit'
};

class Scrollable {
	constructor (text, options = {}) {
		this.options = { ...defaults, ...options };
		this.text = wrap(text, this.width);
		this.lines = this.text.split(EOL);
		this.position = 0;

		this.listener = (str, key) => {
			if (key.name === 'up') {
				this.up();
			}

			if (key.name === 'down') {
				this.down();
			}

			if (key.name === 'backspace') {
				this.stop(false);
			}

			if (key.ctrl && key.name === 'c') {
				this.stop(true);
			}
		};

		process.stdin.on('keypress', this.listener);
		process.stdin.setRawMode(true);
		process.stdin.resume();

		this.render();
	}

	stop (quit) {
		log.clear();

		process.stdin.removeListener('keypress', this.listener);
		process.stdin.setRawMode(false);
		process.stdin.pause();

		this.options.callback(quit);
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

	toString () {
		const buffer = this.lines.slice(this.position, this.position + this.height);
		return buffer.concat(EOL).join(EOL);
	}

	render () {
		log(this.toString() + chalk.dim(this.options.message));

		if (process.stdin.isPaused) {
			process.stdin.resume();
		}
	}
}

module.exports = Scrollable;
