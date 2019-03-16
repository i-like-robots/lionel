const unescape = require('unescape');

class Article {
	constructor (data) {
		this.data = data;
	}

	get title () {
		return this.data.title;
	}

	get byline () {
		return this.data.byline ? this.data.byline.replace(/^by\s+/i, '').trim() : '';
	}

	get publishedDate () {
		return new Date(this.data.publishedDate).toLocaleString();
	}

	get bodyText () {
		return unescape(this.data.bodyText);
	}

	get url () {
		return `https://www.ft.com/content/${this.data.id}`;
	}
}

module.exports = Article;
