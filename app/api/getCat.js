const cheerio = require('cheerio');
const fetch = require('./index.js')

module.exports = () => {
  return fetch('http://random.cat')
  .then(htmlString => {
    const $ = cheerio.load(htmlString);
    return `http://random.cat/${$('#cat')[0].attribs.src}`;
  });
};
