const fetch = require('node-fetch');

module.exports = url => fetch(url).then(response => response.text());
