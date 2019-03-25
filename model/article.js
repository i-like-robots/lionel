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
			return this.data.byline.trim().replace(/^by\s+/i, '').replace(/\.$/, '');
		}
	}

	get publishedDate () {
		return new Date(this.data.publishedDate).toLocaleString();
	}

	get bodyText () {
		return xmlToText(this.data.bodyXML);
	}

	get url () {
		return this.data.webUrl;
	}
}

module.exports = Article;
