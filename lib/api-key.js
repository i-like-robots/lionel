const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = () => {
	const loadFile = (filePath) => {
		const buffer = fs.readFileSync(filePath);
		return String(buffer).trim();
	};

	const filename = '.ft-api-key';

	const filePaths = [
		path.join(os.homedir(), filename),
		path.join(process.cwd(), filename)
	];

	const filePath = filePaths.find((filePath) => fs.existsSync(filePath));

	return filePath ? loadFile(filePath) : process.env.API_KEY;
};
