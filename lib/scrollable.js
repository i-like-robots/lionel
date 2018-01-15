const logUpdate = require('log-update');
const wrap = require('wrap-ansi');
const chalk = require('chalk');

class Pagination {
	constructor (text, callback) {
		this.text = wrap(text, this.width);
		this.rows = this.text.split(/\n/);
		this.position = 0;
		this.callback = callback;
	}

	start () {
		this.listener = (str, key) => {
			if (key.name === 'up') {
				this.up();
			}

			if (key.name === 'down') {
				this.down();
			}

			if (key.name === 'escape' || key.name === 'backspace') {
				this.stop();
				this.callback(true);
			}

			if (key.ctrl && key.name === 'c') {
				this.stop();
				this.callback();
			}
		};

		process.stdin.setRawMode(true);

		process.stdin.resume();

		process.stdin.on('keypress', this.listener);

		this.render();
	}

	stop () {
		process.stdin.removeListener('keypress', this.listener);
		process.stdin.pause();
		logUpdate.clear();
	}

	get width () {
		return Math.min(process.stdout.columns, 80);
	}

	get height () {
		return process.stdout.rows - 4;
	}

	up () {
		if (this.position > 0) {
			this.position--;
			this.render();
		}
	}

	down () {
		if (this.position < this.rows.length - this.height) {
			this.position++;
			this.render();
		}
	}

	render () {
		const buffer = this.rows.slice(this.position, this.position + this.height);

		logUpdate(
			buffer.concat(chalk.dim('\nPress up down etc.')).join('\n')
		);

		if (process.stdin.isPaused) {
			process.stdin.resume();
		}
	}
}

module.exports = Pagination;
