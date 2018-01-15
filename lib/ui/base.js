const readline = require('readline');
const log = require('log-update');

class Base {
	constructor (defaults = {}, options = {}) {
		this.options = { ...defaults, ...options };
		this.keys = new Map();

		this.rl = readline.createInterface({
			terminal: true,
			input: process.stdin,
			output: process.stdout
		});

		this.log = log.create(this.rl.output);
	}

	on (keyname, callback) {
		if (typeof keyname !== 'string') {
			throw new TypeError('Keyname must be of type "string"');
		}

		if (typeof callback !== 'function') {
			throw new TypeError('Callback must be of type "function"');
		}

		this.keys.set(keyname, callback);
	}

	off (keyname) {
		const callback = this.keys.get(keyname);

		if (callback) {
			this.keys.delete(keyname);
		}
	}

	start () {
		// Listen for all key presses and delegate to any key handlers
		this._onKeypress = this.onKeypress.bind(this);
		this.rl.input.on('keypress', this._onKeypress);

		// Make sure we clean up when closing
		this._onExit = this.onExit.bind(this);
		this.rl.on('SIGINT', this._onExit);

		// Start the input stream
		this.rl.resume();

		// First render
		this.render();
	}

	stop () {
		// Clean up any output
		this.log.clear();

		// Clean up all bound event handlers
		this.rl.input.removeListener('keypress', this._onKeypress);
		this.rl.removeListener('SIGINT', this._onExit);

		// Close readline
		this.rl.pause();
		this.rl.close();
	}

	onKeypress (str, key) {
		const callback = this.keys.get(key.name);
		callback && callback(key);
	}

	onExit () {
		this.stop();
	}

	toString () {
		throw new Error('Not implemented');
	}

	render () {
		this.log(this.toString());
	}
}

module.exports = Base;
