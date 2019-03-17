const unescape = require('unescape');
const xmlToText = require('../lib/xml-to-text');

class Article {
	constructor (data) {
		this.data = data;
	}

	get title () {
		return this.data.title.trim();
	}

	get standfirst () {
		if (this.data.standfirst) {
			return this.data.standfirst.trim();
		}
	}

	get byline () {
		if (this.data.byline) {
			return this.data.byline.replace(/^by\s+/i, '').replace(/\.$/, '').trim();
		}
	}

	get publishedDate () {
		return new Date(this.data.publishedDate).toLocaleString();
	}

	get bodyText () {
		const text = xmlToText(this.data.bodyXML);
		return unescape(text);
	}

	get url () {
		return this.data.webUrl;
	}
}

module.exports = Article;
