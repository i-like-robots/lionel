const PREFIX = /^https?:\/\/api\.ft\.com\/things\//;
module.exports = (id) => id.replace(PREFIX, '');
