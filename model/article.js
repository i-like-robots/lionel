const unescape = require('unescape');

class Article {
	constructor (data) {
		this.data = data;
	}

	get title () {
		return this.data.title;
	}

	get byline () {
		return this.data.byline.replace(/^by\s+/i, '').trim();
	}

	get publishedDate () {
		return new Date(this.data.publishedDate).toLocaleString();
	}

	get displayConcept () {
		return this.data.displayConcept && this.data.displayConcept.prefLabel;
	}

	get displayConceptPrefix () {
		if (this.data.brandConcept && this.data.displayConcept.id !== this.data.brandConcept.id) {
			return this.data.brandConcept.prefLabel;
		}

		if (this.data.genreConcept && this.data.displayConcept.id !== this.data.genreConcept.id) {
			return this.data.genreConcept.prefLabel;
		}
	}

	get bodyText () {
		return unescape(this.data.bodyText);
	}

	get url () {
		return `https://www.ft.com/content/${this.data.id}`;
	}
}

module.exports = Article;
