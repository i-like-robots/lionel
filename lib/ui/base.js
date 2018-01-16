const readline = require('readline');
const ansi = require('ansi-escapes');

function onKeypress (str, key) {
	const callback = this.handles.get(key.name);

	if (callback) {
		callback(key);
	}
}

function onExit () {
	this.stop();
}

class Base {
	constructor (defaults = {}, options = {}) {
		this.options = { ...defaults, ...options };
		this.handles = new Map();

		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		this.rl.output.setEncoding('utf-8');

		this.rendered = 0;
	}

	on (keyname, callback) {
		if (typeof keyname !== 'string') {
			throw new TypeError('Keyname must be of type "string"');
		}

		if (typeof callback !== 'function') {
			throw new TypeError('Callback must be of type "function"');
		}

		this.handles.set(keyname, callback);
	}

	off (keyname) {
		const callback = this.handles.get(keyname);

		if (callback) {
			this.handles.delete(keyname);
		}
	}

	start () {
		// Listen for all key presses and delegate to any key handlers
		this._onKeypress = onKeypress.bind(this);
		this.rl.input.on('keypress', this._onKeypress);

		// Make sure we clean up when closing
		this._onExit = onExit.bind(this);
		this.rl.on('SIGINT', this._onExit);

		// Start the input stream
		this.rl.resume();

		// Hide the cursor and clear the screen
		// NOTE: the order is important
		this.rl.output.write(ansi.clearScreen + ansi.cursorHide);

		// First render
		this.render();
	}

	stop () {
		// Clear any output
		this.wipe();

		// Clean up all bound event handlers
		this.rl.input.removeListener('keypress', this._onKeypress);
		this.rl.removeListener('SIGINT', this._onExit);

		// Show the cursor again
		this.rl.output.write(ansi.cursorShow);

		// Close readline
		this.rl.pause();
		this.rl.close();
	}

	get width () {
		return Math.min(this.rl.output.columns, 80);
	}

	get height () {
		return this.rl.output.rows;
	}

	toArray () {
		throw new Error('Not implemented');
	}

	toString () {
		throw new Error('Not implemented');
	}

	wipe () {
		while (this.rendered) {
			this.rl.output.write(ansi.eraseLine + ansi.cursorPrevLine);
			this.rendered--;
		}
	}

	render () {
		const lines = this.toArray();

		this.wipe();
		this.rl.output.write(lines.join('\n'));
		this.rendered = lines.length;
	}
}

module.exports = Base;
