const unescape = require('unescape');

class Article {
	constructor (data) {
		this.data = data;
	}

	get title () {
		return this.data.title.trim();
	}

	get standfirst () {
		return this.data.standfirst.trim();
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
		return unescape(this.data.bodyText);
	}

	get url () {
		return `https://www.ft.com/content/${this.data.id}`;
	}
}

module.exports = Article;
