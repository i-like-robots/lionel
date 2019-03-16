module.exports = (response) => {
	if (response.ok) {
		const contentType = response.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			return response.json();
		} else {
			return response.text();
		}
	} else {
		throw Error(`Request to ${response.url} responded with a ${response.status}`);
	}
};
